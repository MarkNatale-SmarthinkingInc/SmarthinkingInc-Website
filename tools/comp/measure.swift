// Measures a design comp: ink bounding boxes, text line positions, and colours.
// Used to derive type sizes and layout positions from a flat JPEG instead of
// eyeballing them. Read-only — it never writes to the image.
//
//   swiftc -O measure.swift -o measure
//   ./measure <in> <x> <y> <w> <h> <mode> [threshold]
//
// modes:
//   dark      bounding box of pixels darker than threshold (default 90)
//   light     bounding box of pixels lighter than threshold (default 170)
//   rows      per-line top/bottom for light text (line pitch on dark grounds)
//   rowsdark  same, for dark text on light grounds
//   color     most-saturated pixel + mean colour of the region
import Foundation
import CoreGraphics
import ImageIO

let a = CommandLine.arguments
guard a.count >= 7 else { fputs("usage: measure in x y w h mode [threshold]\n", stderr); exit(1) }
let x = Int(a[2])!, y = Int(a[3])!, w = Int(a[4])!, h = Int(a[5])!
let mode = a[6]
let thr = a.count > 7 ? Double(a[7])! : (mode == "dark" ? 90 : 170)

guard let src = CGImageSourceCreateWithURL(URL(fileURLWithPath: a[1]) as CFURL, nil),
      let img = CGImageSourceCreateImageAtIndex(src, 0, nil),
      let crop = img.cropping(to: CGRect(x: x, y: y, width: w, height: h)) else {
    fputs("read/crop failed\n", stderr); exit(1)
}

let cw = crop.width, ch = crop.height
var buf = [UInt8](repeating: 0, count: cw * ch * 4)
guard let ctx = CGContext(data: &buf, width: cw, height: ch, bitsPerComponent: 8,
                          bytesPerRow: cw * 4, space: CGColorSpaceCreateDeviceRGB(),
                          bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue) else { exit(1) }
ctx.draw(crop, in: CGRect(x: 0, y: 0, width: cw, height: ch))

func lum(_ i: Int) -> Double {
    0.299 * Double(buf[i]) + 0.587 * Double(buf[i+1]) + 0.114 * Double(buf[i+2])
}
func match(_ i: Int) -> Bool { mode == "dark" ? lum(i) < thr : lum(i) > thr }

if mode == "color" {
    var best = (r: 0, g: 0, b: 0, sat: -1)
    var sr = 0, sg = 0, sb = 0
    for i in stride(from: 0, to: cw * ch * 4, by: 4) {
        let r = Int(buf[i]), g = Int(buf[i+1]), b = Int(buf[i+2])
        sr += r; sg += g; sb += b
        let sat = max(r, g, b) - min(r, g, b)
        if sat > best.sat { best = (r, g, b, sat) }
    }
    let n = cw * ch
    print(String(format: "most saturated: #%02X%02X%02X   mean: #%02X%02X%02X",
                 best.r, best.g, best.b, sr/n, sg/n, sb/n))
} else if mode == "rows" || mode == "rowsdark" {
    let wantDark = (mode == "rowsdark")
    var runStart = -1
    for row in 0..<ch {
        var n = 0
        for col in 0..<cw {
            let l = lum((row * cw + col) * 4)
            if wantDark ? (l < thr) : (l > thr) { n += 1 }
        }
        if n > 0 && runStart < 0 { runStart = row }
        if n == 0 && runStart >= 0 {
            print("line: top=\(y + runStart) bottom=\(y + row - 1) h=\(row - runStart)")
            runStart = -1
        }
    }
    if runStart >= 0 { print("line: top=\(y + runStart) bottom=\(y + ch - 1) h=\(ch - runStart)") }
} else {
    var minX = cw, maxX = -1, minY = ch, maxY = -1
    for row in 0..<ch {
        for col in 0..<cw where match((row * cw + col) * 4) {
            if col < minX { minX = col }; if col > maxX { maxX = col }
            if row < minY { minY = row }; if row > maxY { maxY = row }
        }
    }
    if maxX < 0 { print("no match"); exit(0) }
    print("bbox abs: x=\(x + minX) y=\(y + minY) w=\(maxX - minX + 1) h=\(maxY - minY + 1)")
}
