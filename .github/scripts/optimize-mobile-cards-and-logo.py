#!/usr/bin/env python3
"""Generate mobile cards and the compact header logo; original images remain untouched."""
from pathlib import Path
from PIL import Image, ImageOps, ImageStat, ImageChops
ASSETS=Path("src/assets")
NAMES=["osasco","lapa","indaiatuba","baroneza","hospital","centro-sp","universidade"]
total_old=0
total_new=0
for name in NAMES:
    source=ASSETS / f"obra-{name}-card-900.webp"
    target=ASSETS / f"obra-{name}-card-700.webp"
    with Image.open(source) as img:
        corrected=ImageOps.exif_transpose(img).convert("RGB")
        thumb=corrected.resize((700,525), Image.Resampling.LANCZOS)
        thumb.save(target, "WEBP", quality=63, method=6)
    assert 8000 <= target.stat().st_size <= 62000, f"Unexpected thumbnail size: {target}"
    total_old += source.stat().st_size
    total_new += target.stat().st_size
    print(f"{target}: {target.stat().st_size} bytes (900px variant: {source.stat().st_size})")
assert total_new <= total_old*0.72, f"Not enough image savings: {total_new}/{total_old}"
logo_source=ASSETS / "thermica-logo-header.webp"
logo_target=ASSETS / "thermica-logo-header-mobile.webp"
with Image.open(logo_source) as img:
    print(f"Original logo: {img.size}, mode={img.mode}")
    src=ImageOps.exif_transpose(img).convert("RGBA")
    new=src.resize((205,131), Image.Resampling.LANCZOS)
    new.save(logo_target,"WEBP",quality=77,method=6)
assert 1000 < logo_target.stat().st_size <= 11000, f"Logo too big: {logo_target.stat().st_size}"
print("TOTAL original cards:",total_old,"mobile cards:",total_new,"saved:",total_old-total_new)
print("LOGO old:",logo_source.stat().st_size,"new:",logo_target.stat().st_size)
