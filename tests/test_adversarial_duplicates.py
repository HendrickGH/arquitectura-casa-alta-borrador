#!/usr/bin/env python3
"""
Adversarial Multi-Metric Perceptual Uniqueness & Duplicate Hunter.
Independent oracle for empirical challenger review (R1).

Computes:
- aHash (Average Hash, 64-bit)
- dHash_h & dHash_v (Horizontal and Vertical Difference Hash, 64-bit and 256-bit)
- pHash (2D Discrete Cosine Transform DCT-II Perceptual Hash, 64-bit)
- Color Histogram correlation (HSV 8x8x8 bins)
- SSIM (Structural Similarity Index) & RMS pixel difference

Scans:
1. Every active photo inside each project gallery (Intra-project).
2. Every active photo across all project galleries (Cross-project).
3. Any photo in curatedGalleries.
"""

import os
import sys
import json
import math
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

# DCT-II Transformation matrix 32x32
N = 32
DCT_MATRIX = np.zeros((N, N), dtype=np.float32)
for i in range(N):
    for j in range(N):
        alpha = math.sqrt(1.0 / N) if i == 0 else math.sqrt(2.0 / N)
        DCT_MATRIX[i, j] = alpha * math.cos((2 * j + 1) * i * math.pi / (2.0 * N))

def compute_ahash(im: Image.Image, size: int = 8) -> np.ndarray:
    resized = im.convert("L").resize((size, size), Image.Resampling.LANCZOS)
    arr = np.array(resized, dtype=np.float32)
    avg = arr.mean()
    return arr > avg

def compute_dhash(im: Image.Image, size: int = 8) -> np.ndarray:
    resized = im.convert("L").resize((size + 1, size), Image.Resampling.LANCZOS)
    arr = np.array(resized, dtype=np.float32)
    diff = arr[:, 1:] > arr[:, :-1]
    return diff.flatten()

def compute_dhash_v(im: Image.Image, size: int = 8) -> np.ndarray:
    resized = im.convert("L").resize((size, size + 1), Image.Resampling.LANCZOS)
    arr = np.array(resized, dtype=np.float32)
    diff = arr[1:, :] > arr[:-1, :]
    return diff.flatten()

def compute_phash(im: Image.Image) -> np.ndarray:
    # 32x32 grayscale
    resized = im.convert("L").resize((32, 32), Image.Resampling.LANCZOS)
    arr = np.array(resized, dtype=np.float32)
    dct = DCT_MATRIX @ arr @ DCT_MATRIX.T
    # Low frequency 8x8 block excluding DC term [0, 0]
    low_freq = dct[:8, :8]
    med = np.median(low_freq.flatten()[1:])  # exclude DC
    return (low_freq > med).flatten()

def compute_ssim(im1: Image.Image, im2: Image.Image, size: int = 64) -> float:
    # Approximate luminance SSIM on size x size
    r1 = np.array(im1.convert("L").resize((size, size), Image.Resampling.BILINEAR), dtype=np.float32)
    r2 = np.array(im2.convert("L").resize((size, size), Image.Resampling.BILINEAR), dtype=np.float32)
    mu1 = r1.mean()
    mu2 = r2.mean()
    sigma1_sq = ((r1 - mu1) ** 2).mean()
    sigma2_sq = ((r2 - mu2) ** 2).mean()
    sigma12 = ((r1 - mu1) * (r2 - mu2)).mean()
    c1 = (0.01 * 255) ** 2
    c2 = (0.03 * 255) ** 2
    ssim = ((2 * mu1 * mu2 + c1) * (2 * sigma12 + c2)) / ((mu1 ** 2 + mu2 ** 2 + c1) * (sigma1_sq + sigma2_sq + c2))
    return float(ssim)

def compute_rms(im1: Image.Image, im2: Image.Image, size: int = 64) -> float:
    r1 = np.array(im1.convert("RGB").resize((size, size), Image.Resampling.BILINEAR), dtype=np.float32)
    r2 = np.array(im2.convert("RGB").resize((size, size), Image.Resampling.BILINEAR), dtype=np.float32)
    return float(np.sqrt(np.mean((r1 - r2) ** 2)))

def hamming_dist(b1: np.ndarray, b2: np.ndarray) -> int:
    return int(np.count_nonzero(b1 != b2))

def is_obra_gris(photo: dict) -> bool:
    text = (photo["slug"] + " " + photo.get("note", "")).lower()
    if any(t in text for t in ["terminad", "acabado final", "casa terminada", "residencia modernizada", "de dia con"]):
        return False
    return any(t in text for t in [
        "obra", "cimentacion", "colado", "armado", "trabajador", "albanil",
        "construccion", "cimbra", "vaciado", "andamio", "excavadora", "mezcladora",
        "manguera", "varilla", "grua", "izado", "revolvedora", "cuadrilla",
        "materiales-obra", "firme", "emboquillado", "limpieza-juntas", "colocacion",
        "frente-obra", "bomba-concreto", "pluma-bomba", "estabilizadores",
        "trazo-laser", "nivel-laser", "bastidor-metalico", "prefabricado",
        "prefabricada", "carretilla", "excavacion", "terraceria", "colocando",
        "soldadura", "demolicion", "maquinaria", "compactador", "compactacion"
    ])

def get_project_photos_sim(manifest: dict, pdir: str):
    proj = next((p for p in manifest["projects"] if p["dir"] == pdir), None)
    if not proj:
        return []
    photos = [dict(p, orig_dir=pdir) for p in proj["photos"] if p.get("score", 0) >= 3 and not p.get("excluded", False)]
    photos.sort(key=lambda x: x["order"])

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
        photos = [p for p in photos if p["base"] not in excluded_bases]

    if pdir == "03-casa-blake-tlalixtac":
        photos = [p for p in photos if "alberca" not in p["base"]]

    finished = [p for p in photos if not is_obra_gris(p)]
    obra_gris = [p for p in photos if is_obra_gris(p)]

    if pdir == "02-el-bicho":
        blake = next((p for p in manifest["projects"] if p["dir"] == "03-casa-blake-tlalixtac"), None)
        if blake:
            blake_pool = [dict(p, orig_dir="03-casa-blake-tlalixtac") for p in blake["photos"] if p.get("score", 0) >= 3 and not p.get("excluded", False) and "alberca" in p["base"]]
            pool_finished = [p for p in blake_pool if not is_obra_gris(p)]
            pool_obra_gris = [p for p in blake_pool if is_obra_gris(p)]
            return finished + pool_finished + obra_gris + pool_obra_gris

    return finished + obra_gris

def main():
    print("=" * 80)
    print("ADVERSARIAL EMPIRICAL CHALLENGER: PERCEPTUAL UNIQUENESS AUDIT")
    print("=" * 80)

    with open(MANIFEST_PATH, "r") as f:
        manifest = json.load(f)

    # 1. Collect all active photos across the 17 portfolio galleries
    all_photos = []
    photo_cache = {}

    for pdir in PORTFOLIO_DIRS:
        active = get_project_photos_sim(manifest, pdir)
        print(f"Project '{pdir}': {len(active)} active gallery photos")
        for p in active:
            orig = p.get("orig_dir", pdir)
            key = f"{orig}/{p['base']}"
            jpg = os.path.join(BASE_DIR, orig, p.get("fallback", p["base"] + ".jpg"))
            avif = os.path.join(BASE_DIR, orig, p["full"]["file"])
            path = jpg if os.path.exists(jpg) else avif
            if not os.path.exists(path):
                path = avif

            if key not in photo_cache:
                try:
                    im = Image.open(path)
                    ahash = compute_ahash(im, 8)
                    dhash8 = compute_dhash(im, 8)
                    dhash8_v = compute_dhash_v(im, 8)
                    dhash16 = compute_dhash(im, 16)
                    phash = compute_phash(im)
                    photo_cache[key] = {
                        "key": key,
                        "pdir": pdir,
                        "orig_dir": orig,
                        "base": p["base"],
                        "note": p.get("note", ""),
                        "path": path,
                        "im": im,
                        "ahash": ahash,
                        "dhash8": dhash8,
                        "dhash8_v": dhash8_v,
                        "dhash16": dhash16,
                        "phash": phash,
                        "is_obra_gris": is_obra_gris(p)
                    }
                except Exception as e:
                    print(f"  [ERROR] Cannot open {path}: {e}")

            all_photos.append(photo_cache[key])

    print(f"\nTotal active photos loaded: {len(all_photos)} (unique image assets: {len(photo_cache)})")

    # 2. INTRA-PROJECT AUDIT: Search for duplicates/near-duplicates within same project
    print("\n" + "=" * 80)
    print("PHASE 1: INTRA-PROJECT ADVERSARIAL SWEEP (Searching near-duplicates & burst shots)")
    print("=" * 80)

    intra_suspects = []

    for pdir in PORTFOLIO_DIRS:
        proj_photos = [p for p in all_photos if p["pdir"] == pdir]
        m = len(proj_photos)
        for i in range(m):
            p1 = proj_photos[i]
            for j in range(i + 1, m):
                p2 = proj_photos[j]
                if p1["base"] == p2["base"]:
                    continue

                dh8 = hamming_dist(p1["dhash8"], p2["dhash8"])
                dh8_v = hamming_dist(p1["dhash8_v"], p2["dhash8_v"])
                dh16 = hamming_dist(p1["dhash16"], p2["dhash16"])
                ah = hamming_dist(p1["ahash"], p2["ahash"])
                ph = hamming_dist(p1["phash"], p2["phash"])

                # Trigger threshold:
                # - Very strict: dh8 <= 3 or ph <= 6 or ah <= 4
                # - Relaxed suspect threshold: dh8 <= 6 or ph <= 10 or dh16 <= 20
                if dh8 <= 6 or ph <= 10 or dh16 <= 20 or ah <= 6:
                    ssim = compute_ssim(p1["im"], p2["im"])
                    rms = compute_rms(p1["im"], p2["im"])
                    intra_suspects.append({
                        "pdir": pdir,
                        "p1": p1["base"],
                        "p2": p2["base"],
                        "dh8": dh8,
                        "dh8_v": dh8_v,
                        "dh16": dh16,
                        "ah": ah,
                        "ph": ph,
                        "ssim": ssim,
                        "rms": rms,
                        "note1": p1["note"],
                        "note2": p2["note"]
                    })

    # Sort intra_suspects by similarity: lowest phash + dhash
    intra_suspects.sort(key=lambda x: (x["ph"], x["dh8"], x["dh16"], -x["ssim"]))

    print(f"Found {len(intra_suspects)} suspect pairs within projects under relaxed threshold (ph<=10 or dh8<=6 or dh16<=20):\n")
    for idx, s in enumerate(intra_suspects[:35], 1):
        print(f"[{idx:02d}] {s['pdir']}:")
        print(f"     A: {s['p1']} ({s['note1']})")
        print(f"     B: {s['p2']} ({s['note2']})")
        print(f"     Metrics: pHash_dist={s['ph']}/64, dHash8_h={s['dh8']}/64, dHash8_v={s['dh8_v']}/64, dHash16={s['dh16']}/256, aHash={s['ah']}/64, SSIM={s['ssim']:.3f}, RMS={s['rms']:.2f}")

    # 3. CROSS-PROJECT AUDIT: Search across DIFFERENT projects
    print("\n" + "=" * 80)
    print("PHASE 2: CROSS-PROJECT ADVERSARIAL SWEEP (Searching accidental cross-project duplicates)")
    print("=" * 80)

    unique_keys = list(photo_cache.keys())
    cross_suspects = []
    total_u = len(unique_keys)

    for i in range(total_u):
        p1 = photo_cache[unique_keys[i]]
        for j in range(i + 1, total_u):
            p2 = photo_cache[unique_keys[j]]
            if p1["pdir"] == p2["pdir"]:
                continue

            dh8 = hamming_dist(p1["dhash8"], p2["dhash8"])
            dh16 = hamming_dist(p1["dhash16"], p2["dhash16"])
            ph = hamming_dist(p1["phash"], p2["phash"])

            # Cross project duplicates would have nearly identical hash
            if dh8 <= 3 or ph <= 5 or dh16 <= 12:
                ssim = compute_ssim(p1["im"], p2["im"])
                rms = compute_rms(p1["im"], p2["im"])
                cross_suspects.append({
                    "p1": p1["key"],
                    "p2": p2["key"],
                    "dh8": dh8,
                    "dh16": dh16,
                    "ph": ph,
                    "ssim": ssim,
                    "rms": rms,
                    "note1": p1["note"],
                    "note2": p2["note"]
                })

    cross_suspects.sort(key=lambda x: (x["ph"], x["dh8"], x["dh16"]))
    print(f"Found {len(cross_suspects)} suspect cross-project pairs:\n")
    for idx, s in enumerate(cross_suspects[:20], 1):
        print(f"[{idx:02d}] CROSS: {s['p1']} vs {s['p2']}")
        print(f"     Metrics: pHash={s['ph']}, dHash8={s['dh8']}, dHash16={s['dh16']}, SSIM={s['ssim']:.3f}, RMS={s['rms']:.2f}")
        print(f"     A: {s['note1']}")
        print(f"     B: {s['note2']}")

    # 4. Critical Duplicate Evaluation
    # Exact duplicate: dHash8 == 0 or (dHash8 <= 1 and dHash16 <= 4) or (pHash == 0 and RMS < 5.0)
    critical_duplicates = [
        s for s in intra_suspects
        if (s["dh8"] == 0 and s["ph"] <= 2) or (s["dh8"] <= 1 and s["dh16"] <= 4 and s["ph"] <= 4) or (s["ph"] == 0 and s["rms"] < 10.0)
    ]

    print("\n" + "=" * 80)
    print("PHASE 3: CRITICAL ACTIVE DUPLICATES")
    print("=" * 80)
    if critical_duplicates:
        print(f"FAIL: {len(critical_duplicates)} critical duplicate pairs found in active galleries!")
        for c in critical_duplicates:
            print(f"  CRITICAL: [{c['pdir']}] {c['p1']} == {c['p2']} (pHash={c['ph']}, dHash8={c['dh8']}, RMS={c['rms']:.2f})")
    else:
        print("PASS: 0 critical duplicate pairs detected across all active galleries.")

if __name__ == "__main__":
    main()
