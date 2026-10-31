#!/usr/bin/env python3
"""
Automated Verification Script for Casa Alta Web Galleries:
1. Perceptual Uniqueness: Asserts zero visual duplicates across active portfolio photos
   using 256-bit dHash, 64-bit dHash, and pixel-level comparison.
2. Casa La Barra Completeness: Asserts that Casa La Barra contains > 1 photo in its active gallery.
3. Runtime Seam Audit: Executes getProjectPhotos() via Node bridge to audit actual rendered galleries.
4. Architectural Spatial Sequence: Asserts that finished works strictly precede
   construction photos ("obra en construcción / proceso") with 0 sequence inversions across all 17 projects.
5. Semantic Regression Canaries: Validates critical classification boundaries in is_construction().
"""

import os
import sys
import json
import re
import subprocess
import numpy as np
from PIL import Image, ImageChops

MANIFEST_PATH = "images-optimizado/manifest.json"
BASE_DIR = "images-optimizado"

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

def dhash(image: Image.Image, hash_size: int = 8) -> np.ndarray:
    """Computes difference hash (dHash) for an image at specified grid size."""
    resized = image.convert("L").resize((hash_size + 1, hash_size), Image.Resampling.LANCZOS)
    pixels = np.array(resized.get_flattened_data(), dtype=np.float32).reshape((hash_size, hash_size + 1))
    diff = pixels[:, 1:] > pixels[:, :-1]
    return diff.flatten()

def hamming_distance(h1: np.ndarray, h2: np.ndarray) -> int:
    return int(np.count_nonzero(h1 != h2))

def rms_diff(im1: Image.Image, im2: Image.Image) -> float:
    """Calculates root-mean-square pixel difference between two images on 0..255 scale."""
    im1_rgb = im1.convert("RGB").resize((128, 128), Image.Resampling.BILINEAR)
    im2_rgb = im2.convert("RGB").resize((128, 128), Image.Resampling.BILINEAR)
    diff = ImageChops.difference(im1_rgb, im2_rgb)
    stat = np.array(diff.get_flattened_data(), dtype=np.float32)
    return float(np.sqrt(np.mean(stat ** 2)))

def is_construction(photo: dict) -> bool:
    """
    Detects if a photograph documents construction process / structural work ("obra gris").
    Synchronized with src/lib/content/photos.ts:isObraGris.
    """
    text = (
        photo.get("base", "")
        + " "
        + photo.get("slug", "")
        + " "
        + photo.get("note", "")
    ).lower().replace("-", " ")

    # Priority construction triggers
    priority_triggers = [
        "obra",
        "en proceso",
        "proceso de",
        "recien colad",
        "en construccion",
        "cimentacion",
        "demolicion",
    ]
    if any(t in text for t in priority_triggers):
        return True

    # Finished state exceptions
    finished_exceptions = [
        "terminad",
        "acabado final",
        "casa terminada",
        "residencia modernizada",
        "de dia con",
        "modernizada",
        "hierro forjado",
        "balcon forjado",
        "concreto pulido",
        "azoteas ajardinadas",
    ]
    if any(t in text for t in finished_exceptions):
        return False

    # Guard: do not match "izado" inside "texturizado"
    if re.search(r"\bizado\b", text) and "texturizado" not in text:
        return True

    construction_regex = (
        r"\b(obra|cimentaci[oó]n|colado|armado|trabajador(es)?|albañil(es)?|albanil(es)?|"
        r"construcci[oó]n|cimbra|vaciado|andamio(s)?|(retro)?excavadora(s)?|excavaci[oó]n|"
        r"mezcladora|manguera|varilla(s)?|gr[uú]a|revolvedora|cuadrilla|materiales|firme|"
        r"emboquillado|limpieza juntas|colocaci[oó]n|colocando|frente obra|bomba concreto|"
        r"pluma bomba|estabilizadores|trazo laser|nivel laser|laser|bastidor|bastidor metalico|"
        r"prefabricad[oa](s)?|carretilla|terracer[ií]a|soldadura|demolici[oó]n|maquinaria|"
        r"compactaci[oó]n|compactador(a)?|encofrado|escombro(s)?|forjado de|en proceso|"
        r"reci[eé]n colad[ao]|aplicaci[oó]n de acabado|mortero|obra gris)\b"
    )
    return bool(re.search(construction_regex, text))

def extract_base_from_src(src: str) -> str:
    """Extracts photo base slug from a /images/<dir>/<base>.avif path."""
    filename = os.path.basename(src)
    return re.sub(r"\.avif$", "", filename)

def verify_galleries() -> int:
    if not os.path.exists(MANIFEST_PATH):
        print(f"Error: manifest file '{MANIFEST_PATH}' not found.")
        return 1

    with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
        manifest = json.load(f)

    print("=================================================================")
    print("VERIFICATION: Programmatic Gallery Uniqueness & Spatial Sequence")
    print("=================================================================")

    has_error = False
    completeness_errors = []
    duplicate_errors = []
    sequence_errors = []
    canary_errors = []

    # Build photo metadata lookup map
    photo_map = {}
    for proj in manifest["projects"]:
        for p in proj["photos"]:
            photo_map[f"{proj['dir']}/{p['base']}"] = p
            photo_map[p["base"]] = p

    # 1. Verify Casa La Barra multi-photo completeness
    barra_proj = next((p for p in manifest["projects"] if p["dir"] == "16-casa-la-barra"), None)
    if not barra_proj:
        completeness_errors.append("16-casa-la-barra project not found in manifest")
    else:
        active_barra = [p for p in barra_proj["photos"] if p.get("score", 0) >= 3 and not p.get("excluded", False)]
        if len(active_barra) <= 1:
            completeness_errors.append(f"16-casa-la-barra has only {len(active_barra)} photo(s); expected > 1")
        else:
            print(f"[OK] Casa La Barra completeness: {len(active_barra)} active photos found.")

    # 2. Perceptual Uniqueness across all active manifest photos
    print("\nAuditing visual uniqueness across active photos in manifest...")
    total_manifest_photos = 0
    for pdir in PORTFOLIO_DIRS:
        proj = next((p for p in manifest["projects"] if p["dir"] == pdir), None)
        if not proj:
            continue
        active_photos = [
            p for p in proj["photos"]
            if p.get("score", 0) >= 3 and not p.get("excluded", False)
        ]
        total_manifest_photos += len(active_photos)

        loaded = []
        for p in active_photos:
            jpg = os.path.join(BASE_DIR, pdir, p["fallback"])
            avif = os.path.join(BASE_DIR, pdir, p["full"]["file"])
            path = jpg if os.path.exists(jpg) else avif
            try:
                im = Image.open(path)
                h8 = dhash(im, 8)
                h16 = dhash(im, 16)
                loaded.append({
                    "base": p["base"],
                    "order": p["order"],
                    "note": p.get("note", ""),
                    "h8": h8,
                    "h16": h16,
                    "im": im,
                })
            except Exception as e:
                print(f"  [ERROR] Failed loading {path}: {e}")

        n = len(loaded)
        for i in range(n):
            for j in range(i + 1, n):
                d8 = hamming_distance(loaded[i]["h8"], loaded[j]["h8"])
                d16 = hamming_distance(loaded[i]["h16"], loaded[j]["h16"])
                if d8 == 0 or (d8 <= 1 and d16 <= 4):
                    rms = rms_diff(loaded[i]["im"], loaded[j]["im"])
                    duplicate_errors.append({
                        "proj": pdir,
                        "p1": loaded[i]["base"],
                        "p2": loaded[j]["base"],
                        "d8": d8,
                        "d16": d16,
                        "rms": rms,
                    })

    # 3. Runtime Seam Execution via Node Bridge
    print("\nAuditing live application runtime getProjectPhotos() via Node bridge...")
    bridge_proc = subprocess.run(
        ["node", "--no-warnings", "--loader", "./tools/ts-loader.mjs", "./tools/dump-rendered-galleries.mjs"],
        capture_output=True,
        text=True,
        check=False,
    )
    if bridge_proc.returncode != 0:
        print(f"[FAIL] Runtime Seam Execution Error:\n{bridge_proc.stderr}")
        return 1

    try:
        rendered_galleries = json.loads(bridge_proc.stdout)
    except Exception as e:
        print(f"[FAIL] Failed parsing rendered galleries JSON: {e}")
        return 1

    total_rendered_photos = sum(len(photos) for photos in rendered_galleries.values())
    print(f"[OK] Successfully rendered {len(rendered_galleries)} galleries ({total_rendered_photos} photos total).")

    # 4. Spatial Sequence & Construction-at-End Invariants on Rendered Output
    for pdir in PORTFOLIO_DIRS:
        rendered = rendered_galleries.get(pdir, [])
        if not rendered:
            sequence_errors.append({
                "proj": pdir,
                "detail": "No photos returned by getProjectPhotos()",
            })
            continue

        rendered_meta = []
        for photo_item in rendered:
            base = extract_base_from_src(photo_item["src"])
            meta = photo_map.get(base)
            if not meta:
                meta = {"base": base, "order": "99", "note": photo_item.get("alt", "")}
            rendered_meta.append(meta)

        # Invariant 4A: Finished works strictly precede construction works (0 inversions)
        seen_construction = False
        first_construction = None
        for p in rendered_meta:
            c = is_construction(p)
            if c:
                seen_construction = True
                if first_construction is None:
                    first_construction = p
            else:
                if seen_construction:
                    sequence_errors.append({
                        "proj": pdir,
                        "finished_photo": p["base"],
                        "finished_order": p.get("order", "??"),
                        "after_construction": first_construction["base"],
                        "construction_order": first_construction.get("order", "??"),
                    })

        # Invariant 4B: Monotonic order for all standard projects
        if pdir != "02-el-bicho":
            orders = [int(p["order"]) for p in rendered_meta if "order" in p]
            for i in range(len(orders) - 1):
                if orders[i] > orders[i + 1]:
                    sequence_errors.append({
                        "proj": pdir,
                        "finished_photo": rendered_meta[i + 1]["base"],
                        "finished_order": str(orders[i + 1]),
                        "after_construction": rendered_meta[i]["base"],
                        "construction_order": str(orders[i]),
                    })
        else:
            # Invariant 4C: Project-specific checks for 02-el-bicho
            excluded_bicho_bases = {
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
            rendered_bases = {p["base"] for p in rendered_meta}
            leaked_exclusions = rendered_bases.intersection(excluded_bicho_bases)
            if leaked_exclusions:
                sequence_errors.append({
                    "proj": pdir,
                    "detail": f"Excluded duplicate bases leaked into rendered gallery: {leaked_exclusions}",
                })

            bicho_fin = [p for p in rendered_meta if not is_construction(p)]
            bicho_obr = [p for p in rendered_meta if is_construction(p)]
            if len(bicho_fin) != 33:
                sequence_errors.append({
                    "proj": pdir,
                    "detail": f"Expected 33 finished photos in El Bicho gallery, got {len(bicho_fin)}",
                })
            if len(bicho_obr) != 42:
                sequence_errors.append({
                    "proj": pdir,
                    "detail": f"Expected 42 construction photos in El Bicho gallery, got {len(bicho_obr)}",
                })

    # 5. Semantic Regression Canaries
    print("\nAuditing semantic regression canaries...")
    canaries = [
        ("01-plaza-esmeralda-puerto-escondido", "12-cristal-madera-noche-ciudad", False, "texturizado not matching izado"),
        ("10-obra-punta-zicatela", "23-mesa-monolitica-concreto-acceso-departamento", False, "concreto pulido finished table"),
        ("04-casa-melchor-ocampo", "08-balcon-forjado-cielo-nubes", False, "balcon forjado ironwork finished balcony"),
        ("10-obra-punta-zicatela", "36-forjado-barra-concreto-muros-tabique", True, "forjado slab casting construction"),
        ("10-obra-punta-zicatela", "38-vista-superior-barra-concreto-recien-colada", True, "recien colada slab casting construction"),
        ("02-el-bicho", "87-instalacion-paneles-estructura-metalica-laser", True, "nivel laser metal frame construction"),
        ("08-rbnb-palmarito", "07-atardecer-bajo-losa-escombros", True, "escombros structural slab construction"),
    ]
    for c_proj, c_base, c_expected, c_desc in canaries:
        photo = photo_map.get(f"{c_proj}/{c_base}") or photo_map.get(c_base)
        if not photo:
            canary_errors.append(f"Canary photo '{c_proj}/{c_base}' not found in manifest")
            continue
        c_actual = is_construction(photo)
        if c_actual != c_expected:
            canary_errors.append(
                f"Canary failed: '{c_proj}/{c_base}' ({c_desc}) expected construction={c_expected}, got {c_actual}"
            )

    # Summary Output
    print("\n-----------------------------------------------------------------")
    print("VERIFICATION RESULTS SUMMARY")
    print("-----------------------------------------------------------------")

    if completeness_errors:
        has_error = True
        print(f"\n[FAIL] Completeness Errors ({len(completeness_errors)}):")
        for err in completeness_errors:
            print(f"  - {err}")
    else:
        print("[PASS] Casa La Barra completeness check passed.")

    if duplicate_errors:
        has_error = True
        print(f"\n[FAIL] Visual Duplicate Invariant Violated ({len(duplicate_errors)} detected):")
        for d in duplicate_errors:
            print(f"  - [{d['proj']}] '{d['p1']}' vs '{d['p2']}' (d8={d['d8']}, d16={d['d16']}, rms={d['rms']:.2f})")
    else:
        print("[PASS] Visual uniqueness check passed: 0 duplicate pairs detected.")

    if sequence_errors:
        has_error = True
        print(f"\n[FAIL] Sequence Ordering Invariant Violated ({len(sequence_errors)} inversions):")
        for s in sequence_errors:
            if "detail" in s:
                print(f"  - [{s['proj']}] {s['detail']}")
            else:
                print(
                    f"  - [{s['proj']}] Finished photo '{s['finished_photo']}' (order {s['finished_order']}) "
                    f"appears after construction photo '{s['after_construction']}' (order {s['construction_order']})"
                )
    else:
        print(f"[PASS] Spatial sequence check passed: 0 construction order inversions detected across {total_rendered_photos} rendered photos.")

    if canary_errors:
        has_error = True
        print(f"\n[FAIL] Semantic Regression Canaries Violated ({len(canary_errors)} errors):")
        for err in canary_errors:
            print(f"  - {err}")
    else:
        print("[PASS] All semantic regression canaries passed.")

    if has_error:
        print("\n>>> Verification FAILED.")
        return 1
    else:
        print("\n>>> All verification checks PASSED successfully.")
        return 0

if __name__ == "__main__":
    sys.exit(verify_galleries())
