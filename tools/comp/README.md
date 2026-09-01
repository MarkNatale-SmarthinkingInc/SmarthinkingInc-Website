# Comp measuring tools

Two small CoreGraphics utilities for reading a flat design comp accurately instead of
eyeballing it. Written during the services redesign, where the master is a 4000×24730
JPEG that has to be inspected section by section.

They exist because this machine has no ImageMagick and no Python PIL. Swift ships with
macOS, so these have no dependencies beyond the OS.

## Build

```bash
cd tools/comp && swiftc -O crop.swift -o crop && swiftc -O measure.swift -o measure
```

The binaries are gitignored; the sources are tracked. Rebuild after a fresh clone.

## crop — cut a region out at full resolution

```bash
./crop <in> <out.png> <x> <y> <w> <h> [maxWidth]
```

`maxWidth` downscales after cutting; omit it (or pass 0) to stay 1:1. Crop tight and
leave `maxWidth` off when you need to read small type.

## measure — bounding boxes, line positions, colours

```bash
./measure <in> <x> <y> <w> <h> <mode> [threshold]
```

| Mode | Does |
|---|---|
| `dark` | bounding box of pixels darker than the threshold (default 90) |
| `light` | bounding box of pixels lighter than the threshold (default 170) |
| `rows` | per-line top/bottom for light text on a dark ground |
| `rowsdark` | per-line top/bottom for dark text on a light ground |
| `color` | most-saturated pixel + mean colour of the region |

## Deriving a type size from a comp

1. `measure … dark` over one line of text to get its **ink width** in comp pixels.
2. Divide by the comp scale to get CSS pixels. The services comp is a **1440px artboard
   at 2.778×** — calibrate that off something with a fixed px size (`.caption` at 16px,
   the `.sup-title` diamond), never off a `vw`-based element, which scales with the
   viewport and can't fix the scale.
3. Measure the same string in the browser at 100px via canvas `measureText`, then
   `size = 100 * targetCssWidth / inkAt100px`.
4. Snap to the nearest `.f-##` class rather than inventing a size.

Watch the window bounds when measuring inside a shape — a region that clips a circle's
edge or an underline will inflate the bounding box. Cross-check a width-derived size
against cap height; if they disagree badly, the window caught something extra.
