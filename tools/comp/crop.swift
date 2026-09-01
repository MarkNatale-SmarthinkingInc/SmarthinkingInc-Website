// Crops a region out of a large design comp so it can be read at full resolution.
// Built for the services redesign, where the master JPEG is 4000x24730 and needs
// to be inspected section by section.
//
//   swiftc -O crop.swift -o crop
//   ./crop <in> <out.png> <x> <y> <w> <h> [maxWidth]
//
// maxWidth downscales the crop after cutting (omit or 0 to keep 1:1).
import Foundation
import CoreGraphics
import ImageIO
import UniformTypeIdentifiers

let a = CommandLine.arguments
guard a.count >= 7 else { fputs("usage: crop in out x y w h [maxWidth]\n", stderr); exit(1) }
let inURL = URL(fileURLWithPath: a[1])
let outURL = URL(fileURLWithPath: a[2])
let x = Int(a[3])!, y = Int(a[4])!, w = Int(a[5])!, h = Int(a[6])!
let maxW = a.count > 7 ? Int(a[7])! : 0

guard let src = CGImageSourceCreateWithURL(inURL as CFURL, nil),
      let img = CGImageSourceCreateImageAtIndex(src, 0, nil) else {
    fputs("cannot read image\n", stderr); exit(1)
}

let rect = CGRect(x: x, y: y, width: w, height: h)
    .intersection(CGRect(x: 0, y: 0, width: img.width, height: img.height))
guard let cropped = img.cropping(to: rect) else {
    fputs("crop failed\n", stderr); exit(1)
}

var out: CGImage = cropped
if maxW > 0 && cropped.width > maxW {
    let scale = Double(maxW) / Double(cropped.width)
    let nw = maxW, nh = Int((Double(cropped.height) * scale).rounded())
    guard let ctx = CGContext(data: nil, width: nw, height: nh, bitsPerComponent: 8,
                              bytesPerRow: 0, space: CGColorSpaceCreateDeviceRGB(),
                              bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue) else {
        fputs("ctx failed\n", stderr); exit(1)
    }
    ctx.interpolationQuality = .high
    ctx.draw(cropped, in: CGRect(x: 0, y: 0, width: nw, height: nh))
    out = ctx.makeImage()!
}

guard let dest = CGImageDestinationCreateWithURL(outURL as CFURL, UTType.png.identifier as CFString, 1, nil) else {
    fputs("dest failed\n", stderr); exit(1)
}
CGImageDestinationAddImage(dest, out, nil)
CGImageDestinationFinalize(dest)
print("wrote \(outURL.path) \(out.width)x\(out.height)")
