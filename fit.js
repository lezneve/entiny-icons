// bun fit.js <max-size> <outer|geometry> name...  scales path geometry about its bbox center to 12,12
import svgpath from "svgpath";
import { svgPathBbox } from "svg-path-bbox";
import { readFileSync, writeFileSync } from "node:fs";

const [target, mode, ...names] = process.argv.slice(2);
const size = Number(target);
for (const name of names) {
  const file = `icons/outline/${name}.svg`;
  let svg = readFileSync(file, "utf8");
  const stroke = Number(/stroke-width="([\d.]+)"/.exec(svg)?.[1] ?? 0) / 2;
  const ds = [...svg.matchAll(/ d="([^"]+)"/g)].map((m) => m[1]);
  let [x0, y0, x1, y1] = [1e9, 1e9, -1e9, -1e9];
  for (const d of ds) {
    const b = svgPathBbox(d);
    x0 = Math.min(x0, b[0]); y0 = Math.min(y0, b[1]); x1 = Math.max(x1, b[2]); y1 = Math.max(y1, b[3]);
  }
  const w = x1 - x0, h = y1 - y0;
  const s = mode === "outer" ? (size - 2 * stroke) / Math.max(w, h) : size / Math.max(w, h);
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  svg = svg.replace(/ d="([^"]+)"/g, (_, d) => ` d="${svgpath(d).translate(-cx, -cy).scale(s).translate(12, 12).round(3).toString()}"`);
  writeFileSync(file, svg);
  console.log(name, `scale ${s.toFixed(3)}`, `${(w * s).toFixed(1)}x${(h * s).toFixed(1)}`);
}
