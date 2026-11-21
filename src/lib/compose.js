const PRESENTATION = ["fill", "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin", "fill-rule", "fill-opacity", "stroke-opacity", "opacity"];

export const STYLES = { outline: "outline" };

export const defaults = {
  color: "#ff4d6d",
  bg: "tile",
  bgOpacity: 0.22,
  radius: 6,
  scale: 0.62,
  weight: 1,
  size: 96,
};

const clamp = (value, min, max, fallback) => {
  const number = Number(value);
  return Number.isFinite(number) ? Math.min(max, Math.max(min, number)) : fallback;
};

export function normalize(input = {}) {
  const color = String(input.color ?? defaults.color).replace(/^#/, "");
  return {
    color: /^[0-9a-f]{6}$/i.test(color) ? `#${color.toLowerCase()}` : defaults.color,
    bg: input.bg === "none" ? "none" : "tile",
    bgOpacity: clamp(input.bgOpacity, 0, 1, defaults.bgOpacity),
    radius: clamp(input.radius, 0, 12, defaults.radius),
    scale: clamp(input.scale, 0.3, 1, defaults.scale),
    weight: clamp(input.weight, 0.5, 3, defaults.weight),
    size: Math.round(clamp(input.size, 16, 1024, defaults.size)),
  };
}

function parse(source) {
  const match = source.match(/<svg\b([^>]*)>([\s\S]*)<\/svg>/);
  if (!match) throw new Error("invalid svg");
  const attrs = Object.fromEntries([...match[1].matchAll(/\s([a-z-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
  return { attrs, inner: match[2].replace(/\s*\n\s*/g, " ").trim() };
}

const round = (value) => Number(value.toFixed(3));

export function compose(source, options = {}) {
  const o = normalize(options);
  const { attrs, inner } = parse(source);
  const paint = (text) => text.replaceAll("currentColor", o.color);
  const group = PRESENTATION.filter((key) => attrs[key] !== undefined)
    .map((key) => `${key}="${paint(key === "stroke-width" ? String(round(Number(attrs[key]) * o.weight)) : attrs[key])}"`)
    .join(" ");
  const tile = o.bg === "tile"
    ? `<rect width="24" height="24" rx="${round(o.radius)}" fill="${o.color}" fill-opacity="${round(o.bgOpacity)}"/>`
    : "";
  const transform = `translate(12 12) scale(${round(o.scale)}) translate(-12 -12)`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${o.size}" height="${o.size}">${tile}<g transform="${transform}"${group ? ` ${group}` : ""}>${paint(inner)}</g></svg>\n`;
}
