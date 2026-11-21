import { readdirSync, readFileSync, writeFileSync } from "node:fs";

const check = process.argv.includes("--check");
const dir = new URL("./svg/", import.meta.url);
const NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const errors = [];
const warnings = [];
const icons = {};

for (const file of readdirSync(dir).sort()) {
  if (!file.endsWith(".svg")) continue;
  const name = file.slice(0, -4);
  const src = readFileSync(new URL(file, dir), "utf8");
  const fail = (m) => errors.push(`${file}: ${m}`);
  const warn = (m) => warnings.push(`${file}: ${m}`);
  if (!NAME.test(name)) fail("name must be lowercase latin, digits, dashes");
  const root = src.match(/<svg\b([^>]*)>([\s\S]*)<\/svg>/);
  if (!root) { fail("no <svg> root"); continue; }
  const [, rootAttrs, inner] = root;
  if (!/viewBox="0 0 24 24"/.test(rootAttrs)) fail('viewBox must be "0 0 24 24"');
  if (/<(image|text|style|script|foreignObject|use)\b/i.test(inner)) fail("raster, text, style, script and <use> are not allowed");
  if (/(href|url\(\s*['"]?(?!#))/i.test(inner)) fail("external references are not allowed");
  if (/\bclass=|\bstyle=/.test(inner)) warn("class/style attributes are ignored by the android converter");
  if (/\btransform=/.test(inner)) warn("transform is not supported by the android converter, flatten the geometry");
  if (/<(linearGradient|radialGradient|filter|mask|clipPath)\b/i.test(inner)) warn("gradients, masks and filters do not survive the android converter");
  if (/\b(fill|stroke)="#(?!0{3,6}\b)[0-9a-f]{3,8}"/i.test(inner)) warn("hardcoded colors, use currentColor so the app can tint the icon");
  // root presentation attributes (fill, stroke, stroke-width...) move into a wrapper group
  const pres = [...rootAttrs.matchAll(/\s(fill|stroke|stroke-width|stroke-linecap|stroke-linejoin|fill-rule|clip-rule|fill-opacity|stroke-opacity)="([^"]*)"/g)]
    .map((m) => `${m[1]}="${m[2]}"`);
  const body = inner.replace(/\s*\n\s*/g, " ").trim();
  icons[name] = { body: pres.length ? `<g ${pres.join(" ")}>${body}</g>` : body };
}

for (const w of warnings) console.warn("warn ", w);
for (const e of errors) console.error("error", e);
if (errors.length) process.exit(1);
if (check) {
  console.log(`ok, ${Object.keys(icons).length} icons`);
  process.exit(0);
}

const pack = {
  prefix: "entiny",
  info: { name: "entinyGram icons", author: { name: "entaytion" }, license: { title: "MIT", spdx: "MIT" } },
  width: 24,
  height: 24,
  icons,
};
writeFileSync(new URL("./icons.json", import.meta.url), JSON.stringify(pack, null, 1) + "\n");
console.log(`icons.json, ${Object.keys(icons).length} icons`);
