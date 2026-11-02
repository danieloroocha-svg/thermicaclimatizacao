#!/usr/bin/env python3
"""Generate optimized responsive thumbnails from existing approved project imagery.
The originals are never changed. Card files are generated deterministically.
"""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path("src/assets")
NAMES = ["osasco","lapa","indaiatuba","baroneza","hospital","centro-sp","universidade"]
WIDTHS = (480, 900)

if __name__ == "__main__":
    total_original = 0
    total_large = 0
    for name in NAMES:
        source = ROOT / f"obra-{name}.webp"
        if not source.exists():
            raise FileNotFoundError(source)
        total_original += source.stat().st_size
        with Image.open(source) as src:
            image = ImageOps.exif_transpose(src).convert("RGB")
            if abs(image.width / image.height - 4/3) > 0.15:
                raise ValueError(f"Unexpected aspect ratio in {source}: {image.size}")
            for width in WIDTHS:
                height = round(image.height * width / image.width)
                small = image.resize((width, height), Image.Resampling.LANCZOS)
                target = ROOT / f"obra-{name}-card-{width}.webp"
                small.save(target, "WEBP", quality=66, method=6)
                if target.stat().st_size > (120_000 if width == 900 else 55_000):
                    raise ValueError(f"Target too large: {target}: {target.stat().st_size} bytes")
                print(f"{target}: {width}x{height}; {target.stat().st_size} bytes")
                if width == 900:
                    total_large += target.stat().st_size
    print(f"Total originals: {total_original} bytes; 900px thumbnails: {total_large} bytes.")
    if total_large >= total_original * 0.65:
        raise ValueError("Optimized project thumbnails did not achieve the expected savings")
