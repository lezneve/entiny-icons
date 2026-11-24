// builds dist/entiny.icons, an icon pack for entinyGram / telegram forks with icon-pack support.
// reads telegram/map.txt (telegram drawable name -> entiny icon and optional viewBox), writes a zip with metadata.json
// and one svg per mapped icon. run: node telegram/build.js  (or bun run telegram)
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { deflateRawSync, crc32 } from "node:zlib";

const root = new URL("../", import.meta.url);
const { version } = JSON.parse(readFileSync(new URL("package.json", root), "utf8"));
const PACK = { packId: "entiny", packName: "entinyGram Icons", author: "@entinyGram", version };

const num = (v) => +(+v).toFixed(3);
const attr = (s, name) => s.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];

// the loader draws path and rect natively; everything else is rewritten as a path
function toPath(tag, a) {
  const g = (n, d = 0) => parseFloat(attr(a, n) ?? d);
  if (tag === "circle") {
    const [cx, cy, r] = [g("cx"), g("cy"), g("r")];
    return `M${num(cx - r)} ${num(cy)}a${num(r)} ${num(r)} 0 1 0 ${num(2 * r)} 0a${num(r)} ${num(r)} 0 1 0 ${num(-2 * r)} 0Z`;
  }
  if (tag === "ellipse") {
    const [cx, cy, rx, ry] = [g("cx"), g("cy"), g("rx"), g("ry")];
    return `M${num(cx - rx)} ${num(cy)}a${num(rx)} ${num(ry)} 0 1 0 ${num(2 * rx)} 0a${num(rx)} ${num(ry)} 0 1 0 ${num(-2 * rx)} 0Z`;
  }
  if (tag === "line") return `M${g("x1")} ${g("y1")}L${g("x2")} ${g("y2")}`;
  const pts = (attr(a, "points") ?? "").trim().split(/[\s,]+/);
  let d = "";
  for (let i = 0; i + 1 < pts.length; i += 2) d += `${i ? "L" : "M"}${pts[i]} ${pts[i + 1]}`;
  return tag === "polygon" ? d + "Z" : d;
}

function convert(name, src, viewBox) {
  const body = src.match(/<svg\b([^>]*)>([\s\S]*)<\/svg>/);
  if (!body) throw new Error(`${name}: no svg root`);
  if (/\btransform=|<(use|defs|mask|clipPath|text|image)\b/.test(body[2])) throw new Error(`${name}: unsupported markup`);
  const out = [];
  for (const m of body[2].matchAll(/<(path|rect|circle|ellipse|line|polyline|polygon)\b([^>]*?)\/?>/g)) {
    const [, tag, a] = m;
    const rest = a.replace(/\s(d|cx|cy|r|rx|ry|x1|y1|x2|y2|points)="[^"]*"/g, (s, k) =>
      tag === "rect" && (k === "rx" || k === "ry") ? s : "");
    if (tag === "path" || tag === "rect") out.push(`<${tag}${a.replace(/\s+$/, "")}/>`);
    else out.push(`<path d="${toPath(tag, a)}"${rest.replace(/\s+$/, "")}/>`);
  }
  if (!out.length) throw new Error(`${name}: empty`);
  // the app tints the icon, so the colour is white like in the solar pack; currentColor is not understood natively
  const rootAttrs = body[1]
    .replace(/\sxmlns(:\w+)?="[^"]*"/g, "")
    .replace(/\s(width|height)="[^"]*"/g, "")
    .replace(/\sviewBox="[^"]*"/g, "")
    .replace(/currentColor/g, "#ffffff")
    .trim();
  const [, , width, height] = viewBox;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${viewBox.join(" ")}" ${rootAttrs}>${out.join("")}</svg>`;
}

function zip(files) {
  const parts = [], central = [];
  let offset = 0;
  for (const [name, data] of files) {
    const nameBuf = Buffer.from(name), raw = Buffer.from(data), packed = deflateRawSync(raw, { level: 9 });
    const crc = crc32(raw);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x0800, 6); // utf-8 names
    local.writeUInt16LE(8, 8);
    local.writeUInt16LE(0, 10); local.writeUInt16LE(0x21, 12); // fixed 1980-01-01 for reproducible output
    local.writeUInt32LE(crc >>> 0, 14);
    local.writeUInt32LE(packed.length, 18);
    local.writeUInt32LE(raw.length, 22);
    local.writeUInt16LE(nameBuf.length, 26);
    parts.push(local, nameBuf, packed);
    const c = Buffer.alloc(46);
    c.writeUInt32LE(0x02014b50, 0);
    c.writeUInt16LE(20, 4); c.writeUInt16LE(20, 6); c.writeUInt16LE(0x0800, 8); c.writeUInt16LE(8, 10);
    c.writeUInt16LE(0, 12); c.writeUInt16LE(0x21, 14);
    c.writeUInt32LE(crc >>> 0, 16);
    c.writeUInt32LE(packed.length, 20);
    c.writeUInt32LE(raw.length, 24);
    c.writeUInt16LE(nameBuf.length, 28);
    c.writeUInt32LE(offset, 42);
    central.push(c, nameBuf);
    offset += 30 + nameBuf.length + packed.length;
  }
  const cd = Buffer.concat(central);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(files.length, 8); end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(cd.length, 12); end.writeUInt32LE(offset, 16);
  return Buffer.concat([...parts, cd, end]);
}

const pairs = readFileSync(new URL("telegram/map.txt", root), "utf8")
  .split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#")).map((l) => l.split(/\s+/));

const icons = {}, files = [], svgCache = new Map(), missing = [];
const drawableName = /^[a-z][a-z0-9_]*$/;
const iconName = /^@?[a-z0-9]+(?:-[a-z0-9]+)*$/;
for (const [tg, name, ...viewport] of pairs) {
  if (!drawableName.test(tg) || !name || !iconName.test(name)) throw new Error(`invalid mapping: ${tg} ${name ?? ""}`);
  const viewBox = viewport.length ? viewport.map(Number) : [0, 0, 24, 24];
  if (viewBox.length !== 4 || !viewBox.every(Number.isFinite) || viewBox[2] <= 0 || viewBox[3] <= 0) {
    throw new Error(`invalid viewBox for ${tg}: ${viewport.join(" ")}`);
  }
  if (icons[tg]) throw new Error(`duplicate key ${tg}`);
  const key = `${name} ${viewBox.join(" ")}`;
  if (!svgCache.has(key)) {
    const source = name.startsWith("@") ? `telegram/assets/${name.slice(1)}.svg` : `icons/outline/${name}.svg`;
    try { svgCache.set(key, convert(name, readFileSync(new URL(source, root), "utf8"), viewBox)); }
    catch (e) { if (e.code === "ENOENT") { missing.push(`${tg} -> ${name}`); continue; } throw e; }
  }
  const file = `${tg}_entiny.svg`;
  icons[tg] = file;
  files.push([file, svgCache.get(key)]);
}
if (missing.length) {
  console.error(`missing entiny icons:\n  ${missing.join("\n  ")}`);
  process.exit(1);
}

files.sort((a, b) => a[0].localeCompare(b[0]));
files.unshift(["metadata.json", JSON.stringify({ ...PACK, icons }, null, 2)]);
mkdirSync(new URL("dist/", root), { recursive: true });
writeFileSync(new URL("dist/entiny.icons", root), zip(files));
console.log(`dist/entiny.icons: ${Object.keys(icons).length} telegram resources, ${new Set(pairs.map(([, name]) => name)).size} source icons`);
