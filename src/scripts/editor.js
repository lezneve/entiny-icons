import { entries, matchesSearch } from "../lib/catalog.js";
import { compose, defaults } from "../lib/compose.js";
import { loadBundle, maskUrl } from "../lib/bundle.js";

const $ = (selector) => document.querySelector(selector);
const packPreview = entries.filter(({ category }) => ["chat", "media", "interface"].includes(category)).slice(0, 21);
const state = { ...defaults, name: "entinygram", style: "outline", surface: "dark" };
let request = 0;
let svgNow = "";
let packed = null;

const iconUrl = ({ name }, style) => `/${style}/${name}.svg`;
const current = () => entries.find((icon) => icon.name === state.name) ?? entries[0];
const options = () => ({ color: state.color, bg: state.bg, bgOpacity: state.bgOpacity, radius: state.radius, scale: state.scale, weight: state.weight, size: state.size });
const sources = new Map();
const fetchSource = (url) => {
  const [, style, file] = url.split("/");
  const inline = packed?.[style]?.[file.slice(0, -4)];
  if (inline) return Promise.resolve(inline);
  if (!sources.has(url)) {
    sources.set(url, fetch(url, { cache: "no-cache" }).then((response) => {
      if (!response.ok) throw new Error(url);
      return response.text();
    }));
    sources.get(url).catch(() => sources.delete(url));
  }
  return sources.get(url);
};
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState !== "visible") return;
  sources.clear();
  render();
});
const apiUrl = () => {
  const p = new URLSearchParams({
    name: state.name,
    style: state.style,
    color: state.color.slice(1),
    bg: state.bg,
    opacity: String(state.bgOpacity),
    radius: String(state.radius),
    scale: String(state.scale),
    weight: String(state.weight),
    size: String(state.size),
  });
  return `${location.origin}/api/icon?${p}`;
};

function syncUrl() {
  const url = new URL(location.href);
  url.search = new URLSearchParams({ icon: state.name, style: state.style, color: state.color.slice(1) }).toString();
  history.replaceState(null, "", url);
}

function renderCatalog() {
  const words = $("#search").value.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const matches = entries.filter((icon) => matchesSearch(icon, words));
  $("#count").textContent = `${matches.length} / ${entries.length}`;
  $("#picker-empty").hidden = matches.length > 0;
  $("#catalog").replaceChildren(...matches.map((icon) => {
    const button = document.createElement("button");
    button.className = "catalog-item";
    button.type = "button";
    button.dataset.name = icon.name;
    button.setAttribute("aria-pressed", String(icon.name === state.name));
    const swatch = document.createElement("span");
    swatch.className = "swatch";
    swatch.setAttribute("aria-hidden", "true");
    const inline = packed?.[state.style]?.[icon.name];
    swatch.style.setProperty("--icon", inline ? maskUrl(inline) : `url("${iconUrl(icon, state.style)}")`);
    const label = document.createElement("span");
    label.className = "catalog-name";
    label.textContent = icon.name;
    button.append(swatch, label);
    button.addEventListener("click", () => {
      state.name = icon.name;
      for (const item of $("#catalog").children) item.setAttribute("aria-pressed", String(item === button));
      render();
    });
    return button;
  }));
}

async function render() {
  const id = ++request;
  const icon = current();
  const url = iconUrl(icon, state.style);
  $("#edit-title").textContent = icon.name;
  $("#file-name").textContent = url.slice(1);
  $("#api-url").textContent = apiUrl();
  $("#stage").dataset.surface = state.surface;
  syncUrl();

  try {
    const svg = compose(await fetchSource(url), options());
    if (id !== request) return;
    $("#art").innerHTML = svg;
    svgNow = svg;
  } catch {
    if (id === request) $("#art").textContent = "не вдалося відкрити іконку";
  }

  const cells = await Promise.all(packPreview.map(async (icon) => {
    try {
      return [icon.name, compose(await fetchSource(iconUrl(icon, state.style)), { ...options(), size: 64 })];
    } catch {
      return null;
    }
  }));
  if (id !== request) return;
  $("#pack-grid").replaceChildren(...cells.filter(Boolean).map(([name, svg]) => {
    const cell = document.createElement("div");
    cell.className = "pack-cell";
    cell.title = name;
    cell.innerHTML = svg;
    return cell;
  }));
}

function setColor(value) {
  if (!/^#[0-9a-f]{6}$/i.test(value)) return;
  state.color = value.toLowerCase();
  $("#color").value = state.color;
  $("#hex").value = state.color;
  render();
}

function download(blob, filename) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

async function say(text) {
  $("#feedback").textContent = text;
}

async function copy(text, done) {
  try {
    await navigator.clipboard.writeText(text);
    say(done);
  } catch {
    say("буфер обміну недоступний");
  }
}

const ranges = {
  opacity: ["bgOpacity", (v) => v / 100, (v) => `${v}%`],
  radius: ["radius", Number, (v) => v],
  scale: ["scale", (v) => v / 100, (v) => `${v}%`],
  weight: ["weight", (v) => v / 100, (v) => `${v}%`],
  size: ["size", Number, (v) => `${v} px`],
};
for (const [id, [key, convert, label]] of Object.entries(ranges)) {
  $(`#${id}`).addEventListener("input", (event) => {
    state[key] = convert(Number(event.target.value));
    $(`#${id}-value`).textContent = label(event.target.value);
    render();
  });
}

$("#search").addEventListener("input", renderCatalog);
$("#styles").addEventListener("change", (event) => {
  state.style = event.target.value;
  renderCatalog();
  render();
});
$("#bg").addEventListener("change", (event) => { state.bg = event.target.value; render(); });
$("#surface").addEventListener("change", (event) => { state.surface = event.target.value; render(); });
$("#color").addEventListener("input", (event) => setColor(event.target.value));
$("#hex").addEventListener("input", (event) => setColor(event.target.value.startsWith("#") ? event.target.value : `#${event.target.value}`));
$("#presets").addEventListener("click", (event) => {
  const color = event.target.closest("[data-color]")?.dataset.color;
  if (color) setColor(color);
});
$("#copy").addEventListener("click", () => copy(svgNow, "svg скопійовано"));
$("#download-svg").addEventListener("click", () => download(new Blob([svgNow], { type: "image/svg+xml" }), `${state.name}.svg`));
$("#download-png").addEventListener("click", async () => {
  const image = new Image();
  const url = URL.createObjectURL(new Blob([svgNow], { type: "image/svg+xml" }));
  image.src = url;
  try {
    await image.decode();
  } catch {
    URL.revokeObjectURL(url);
    return say("не вдалося створити png");
  }
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = state.size;
  canvas.getContext("2d").drawImage(image, 0, 0, state.size, state.size);
  URL.revokeObjectURL(url);
  canvas.toBlob((blob) => blob && download(blob, `${state.name}.png`));
});
$("#api-url").addEventListener("click", () => copy(apiUrl(), "посилання скопійовано"));

const params = new URLSearchParams(location.search);
if (entries.some((icon) => icon.name === params.get("icon"))) state.name = params.get("icon");
if (params.get("style") === "outline") state.style = params.get("style");
$(`#styles [value="${state.style}"]`).checked = true;
if (/^[0-9a-f]{6}$/i.test(params.get("color") ?? "")) setColor(`#${params.get("color")}`);
const start = (data) => {
  packed = data ?? null;
  renderCatalog();
  render();
};
loadBundle().then(start, () => start());
