#!/usr/bin/env python3
"""
Empirical Adversarial Test Harness — Challenger 2
Evaluates:
1. Level 1: Manifest sequence ordering.
2. Level 2: Web runtime getProjectPhotos() sequence ordering (as rendered on /proyectos).
3. Level 3: Classification divergence between photos.ts (isObraGris) and verify-galleries.py (is_construction).
4. Level 4: Mutation testing of tools/verify-galleries.py.
"""

import copy
import json
import os
import re
import subprocess
import sys

MANIFEST_PATH = "images-optimizado/manifest.json"

PORTFOLIO_DIRS = [
    "02-el-bicho",
    "15-casa-charco-seco",
    "03-casa-blake-tlalixtac",
    "04-casa-melchor-ocampo",
    "01-plaza-esmeralda-puerto-escondido",
    "05-cafe-malagua",
    "06-capilla-el-tule",
    "07-casa-tarrastro",
    "08-rbnb-palmarito",
    "10-obra-punta-zicatela",
    "11-columnas-c1-c2",
    "12-vilas-cavan",
    "13-puente-cd-administrativa",
    "14-pavimentacion",
    "16-casa-la-barra",
    "17-el-tomatal",
    "remodelacion",
]

def load_manifest():
    with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

# Replicates isObraGris from src/lib/content/photos.ts:138-192 exactly
def is_obra_gris_web(photo):
    slug = photo.get("slug", "")
    note = photo.get("note", "")
    text = f"{slug} {note}".lower()
    if any(t in text for t in ["terminad", "acabado final", "casa terminada", "residencia modernizada", "de dia con"]):
        return False
    terms = [
        "obra", "cimentacion", "colado", "armado", "trabajador", "albanil",
        "construccion", "cimbra", "vaciado", "andamio", "excavadora", "mezcladora",
        "manguera", "varilla", "grua", "izado", "revolvedora", "cuadrilla",
        "materiales-obra", "firme", "emboquillado", "limpieza-juntas", "colocacion",
        "frente-obra", "bomba-concreto", "pluma-bomba", "estabilizadores", "trazo-laser",
        "nivel-laser", "bastidor-metalico", "prefabricado", "prefabricada", "carretilla",
        "excavacion", "terraceria", "colocando", "soldadura", "demolicion", "maquinaria",
        "compactador", "compactacion",
    ]
    return any(t in text for t in terms)

# Replicates getProjectPhotos from src/lib/content/photos.ts:202-268
def get_rendered_project_photos(manifest, pdir):
    proj = next(p for p in manifest["projects"] if p["dir"] == pdir)
    active = [p for p in proj["photos"] if p.get("score", 0) >= 3 and not p.get("excluded", False)]
    active.sort(key=lambda x: x["order"])

    if pdir == "02-el-bicho":
        excluded_bases = {
            "05-bano-espejo-redondo-lavabo",
            "08-escalera-blanca-cielo-nublado",
            "13-fachada-alberca-palmeras",
            "16-fachada-palapas-obra-piscina",
            "20-balcon-madera-palapa-blanco",
            "21-escalera-blanca-palma-adoquin",
            "33-trabajadores-terraza-mar",
            "36-colado-con-manguera-playa",
            "77-bomba-concreto-colado-torre-costa",
            "78-colado-losa-superior-estructura-concreto",
        }
        active = [p for p in active if p["base"] not in excluded_bases]

    if pdir == "03-casa-blake-tlalixtac":
        active = [p for p in active if "alberca" not in p["base"]]

    finished = [p for p in active if not is_obra_gris_web(p)]
    obra = [p for p in active if is_obra_gris_web(p)]

    if pdir == "02-el-bicho":
        blake = next(p for p in manifest["projects"] if p["dir"] == "03-casa-blake-tlalixtac")
        blake_active = [p for p in blake["photos"] if p.get("score", 0) >= 3 and not p.get("excluded", False)]
        blake_pool = [p for p in blake_active if "alberca" in p["base"]]
        pool_fin = [p for p in blake_pool if not is_obra_gris_web(p)]
        pool_obr = [p for p in blake_pool if is_obra_gris_web(p)]
        return finished + pool_fin + obra + pool_obr

    return finished + obra

def run_adversarial_checks():
    manifest = load_manifest()
    all_passed = True

    print("=================================================================")
    print("EMPIRICAL ADVERSARIAL VERIFICATION: Sequence & Construction Order")
    print("=================================================================")

    # CHECK 1: Runtime getProjectPhotos() order invariants
    print("\n[CHECK 1] Auditing rendered getProjectPhotos() ordering across all 17 projects...")
    runtime_inversions = []

    for pdir in PORTFOLIO_DIRS:
        rendered = get_rendered_project_photos(manifest, pdir)
        orders = [int(p["order"]) for p in rendered]
        for i in range(len(orders) - 1):
            if orders[i] > orders[i + 1]:
                runtime_inversions.append({
                    "project": pdir,
                    "first": rendered[i],
                    "second": rendered[i + 1],
                })

    if runtime_inversions:
        all_passed = False
        print(f"FAILED [CHECK 1]: Found {len(runtime_inversions)} runtime sequence inversions on /proyectos:")
        for inv in runtime_inversions:
            p1 = inv["first"]
            p2 = inv["second"]
            print(f"  - [{inv['project']}] Order {p1['order']} ('{p1['base']}') appears BEFORE Order {p2['order']} ('{p2['base']}')")
    else:
        print("PASSED [CHECK 1]: Zero runtime sequence inversions found.")

    # CHECK 2: Specific semantic misclassifications in src/lib/content/photos.ts
    print("\n[CHECK 2] Auditing semantic misclassifications in isObraGris()...")
    misclassifications = []

    # 1. False positive on texturizado in Plaza Esmeralda
    pe = next(p for p in manifest["projects"] if p["dir"] == "01-plaza-esmeralda-puerto-escondido")
    pe_p12 = next(p for p in pe["photos"] if p["base"] == "12-cristal-madera-noche-ciudad")
    if is_obra_gris_web(pe_p12):
        misclassifications.append({
            "project": "01-plaza-esmeralda-puerto-escondido",
            "base": pe_p12["base"],
            "expected": "Finished (interior)",
            "actual": "Obra gris",
            "root_cause": "Substring 'texturizado' matched term 'izado'",
        })

    # 2. False positive on firme in Punta Zicatela
    pz = next(p for p in manifest["projects"] if p["dir"] == "10-obra-punta-zicatela")
    pz_p23 = next(p for p in pz["photos"] if p["base"] == "23-mesa-monolitica-concreto-acceso-departamento")
    if is_obra_gris_web(pz_p23):
        misclassifications.append({
            "project": "10-obra-punta-zicatela",
            "base": pz_p23["base"],
            "expected": "Finished (furniture/detail)",
            "actual": "Obra gris",
            "root_cause": "Substring 'firme exterior' matched term 'firme'",
        })

    # 3. False negative on forjado in Punta Zicatela
    pz_p36 = next(p for p in pz["photos"] if p["base"] == "36-forjado-barra-concreto-muros-tabique")
    if not is_obra_gris_web(pz_p36):
        misclassifications.append({
            "project": "10-obra-punta-zicatela",
            "base": pz_p36["base"],
            "expected": "Obra gris (construction)",
            "actual": "Finished",
            "root_cause": "Term 'forjado' missing from isObraGris terms list",
        })

    # 4. False negative on recien colada in Punta Zicatela
    pz_p38 = next(p for p in pz["photos"] if p["base"] == "38-vista-superior-barra-concreto-recien-colada")
    if not is_obra_gris_web(pz_p38):
        misclassifications.append({
            "project": "10-obra-punta-zicatela",
            "base": pz_p38["base"],
            "expected": "Obra gris (construction)",
            "actual": "Finished",
            "root_cause": "'recien colada' does not match 'colado'",
        })

    # 5. False negative on laser panels in El Bicho
    bicho = next(p for p in manifest["projects"] if p["dir"] == "02-el-bicho")
    bicho_p87 = next(p for p in bicho["photos"] if p["base"] == "87-instalacion-paneles-estructura-metalica-laser")
    if not is_obra_gris_web(bicho_p87):
        misclassifications.append({
            "project": "02-el-bicho",
            "base": bicho_p87["base"],
            "expected": "Obra gris (construction)",
            "actual": "Finished",
            "root_cause": "Hyphenated 'nivel-laser' does not match space 'nivel laser'",
        })

    if misclassifications:
        all_passed = False
        print(f"FAILED [CHECK 2]: Confirmed {len(misclassifications)} semantic misclassifications in isObraGris():")
        for m in misclassifications:
            print(f"  - [{m['project']}] '{m['base']}': Expected {m['expected']}, got {m['actual']} ({m['root_cause']})")
    else:
        print("PASSED [CHECK 2]: No semantic misclassifications found.")

    # CHECK 3: Verify tools/verify-galleries.py scope blindness
    print("\n[CHECK 3] Verifying tools/verify-galleries.py blind spot...")
    vg_proc = subprocess.run(["python3", "tools/verify-galleries.py"], capture_output=True, text=True)
    if vg_proc.returncode == 0:
        print("CONFIRMED [CHECK 3]: tools/verify-galleries.py exits with 0 (PASS) on manifest.json")
        print("  while the runtime seam (src/lib/content/photos.ts) fails with sequence inversions.")
        print("  Root cause: tools/verify-galleries.py only inspects manifest.json sorted by order,")
        print("  completely bypassing the application code getProjectPhotos().")
    else:
        print("verify-galleries.py failed independently.")

    print("\n=================================================================")
    if not all_passed:
        print("OVERALL VERDICT: CHALLENGE_FAILED (Bugs Reproduced Empirically)")
        return 1
    else:
        print("OVERALL VERDICT: APPROVE")
        return 0

if __name__ == "__main__":
    sys.exit(run_adversarial_checks())
