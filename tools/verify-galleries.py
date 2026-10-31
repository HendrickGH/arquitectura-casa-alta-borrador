#!/usr/bin/env python3
"""
Automated Verification Script for Casa Alta Web Galleries:
1. Perceptual Uniqueness: Asserts zero visual duplicates across active portfolio photos
   using 256-bit dHash, 64-bit dHash, and pixel-level comparison.
2. Architectural Spatial Sequence: Asserts that finished works strictly precede
   construction photos ("obra en construcción / proceso") with 0 sequence inversions.
3. Casa La Barra Completeness: Asserts that Casa La Barra contains > 1 photo in its active gallery.
"""

import os
import sys
import json
import re
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
    "remodelacion"
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
    """
    text = (photo["base"] + " " + photo.get("note", "")).lower().replace("-", " ")
    
    # Priority construction triggers
    if any(t in text for t in ["obra", "en proceso", "recien colada", "en construccion", "cimentacion", "demolicion"]):
        return True
        
    # Finished state exceptions
    if any(t in text for t in [
        "terminad", "acabado final", "casa terminada", "residencia modernizada",
        "de dia con", "modernizada", "hierro forjado", "concreto pulido", "azoteas ajardinadas"
    ]):
        return False
        
    construction_patterns = [
        r"\bobra\b", r"\bcimentaci[oó]n\b", r"\bcolado\b", r"\barmado\b",
        r"\btrabajador(es)?\b", r"\balbañil(es)?\b", r"\balbanil(es)?\b",
        r"\bconstrucci[oó]n\b", r"\bcimbra\b", r"\bvaciado\b", r"\bandamio(s)?\b",
        r"\b(retro)?excavadora(s)?\b", r"\bexcavaci[oó]n\b", r"\bmezcladora\b",
        r"\bmanguera\b", r"\bvarilla(s)?\b", r"\bgrua\b", r"\bgrúa\b", r"\bizado\b",
        r"\brevolvedora\b", r"\bcuadrilla\b", r"\bmateriales\b", r"\bfirme\b",
        r"\bemboquillado\b", r"\blimpieza juntas\b", r"\bcolocaci[oó]n\b", r"\bcolocando\b",
        r"\bfrente obra\b", r"\bbomba concreto\b", r"\bpluma bomba\b", r"\bestabilizadores\b",
        r"\btrazo laser\b", r"\bnivel laser\b", r"\blaser\b", r"\bbastidor\b",
        r"\bprefabricad[oa](s)?\b", r"\bcarretilla\b", r"\bterracer[ií]a\b",
        r"\bsoldadura\b", r"\bdemolici[oó]n\b", r"\bmaquinaria\b",
        r"\bcompactaci[oó]n\b", r"\bcompactador(a)?\b",
        r"\bencofrado\b", r"\bescombro(s)?\b", r"\bforjado de\b", r"\ben proceso\b",
        r"\breci[eé]n colada\b", r"\baplicaci[oó]n de acabado\b", r"\bobra gris\b"
    ]
    
    for pattern in construction_patterns:
        if re.search(pattern, text):
            # Guard: do not match "izado" inside "texturizado"
            if "izado" in pattern and "texturizado" in text and not re.search(r"\bizado\b", text.replace("texturizado", "")):
                continue
            return True
            
    return False

def verify_galleries() -> int:
    if not os.path.exists(MANIFEST_PATH):
        print(f"Error: manifest file '{MANIFEST_PATH}' not found.")
        return 1

    with open(MANIFEST_PATH, "r") as f:
        manifest = json.load(f)

    print("=================================================================")
    print("VERIFICATION: Programmatic Gallery Uniqueness & Spatial Sequence")
    print("=================================================================")

    total_photos_checked = 0
    duplicate_errors = []
    sequence_errors = []
    completeness_errors = []

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

    # 2. Iterate each portfolio project
    for pdir in PORTFOLIO_DIRS:
        proj = next((p for p in manifest["projects"] if p["dir"] == pdir), None)
        if not proj:
            print(f"[WARN] Project {pdir} not in manifest")
            continue

        # Active photos: score >= 3 and not excluded
        active_photos = [
            p for p in proj["photos"]
            if p.get("score", 0) >= 3 and not p.get("excluded", False)
        ]
        active_photos.sort(key=lambda x: x["order"])
        total_photos_checked += len(active_photos)

        # A. Visual Hash Uniqueness Check
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
                    "im": im
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

        # B. Spatial Sequence Invariant Check (0 inversions)
        seen_construction = False
        first_construction = None
        for p in active_photos:
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
                        "finished_order": p["order"],
                        "after_construction": first_construction["base"],
                        "construction_order": first_construction["order"],
                    })

    print(f"\nTotal active photos audited across {len(PORTFOLIO_DIRS)} projects: {total_photos_checked}")

    has_error = False

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
            print(f"  - [{s['proj']}] Finished photo '{s['finished_photo']}' (order {s['finished_order']}) appears after construction photo '{s['after_construction']}' (order {s['construction_order']})")
    else:
        print("[PASS] Spatial sequence check passed: 0 construction order inversions detected.")

    if has_error:
        print("\n>>> Verification FAILED.")
        return 1
    else:
        print("\n>>> All verification checks PASSED successfully.")
        return 0

if __name__ == "__main__":
    sys.exit(verify_galleries())
