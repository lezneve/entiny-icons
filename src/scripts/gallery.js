import { entries, matchesSearch, categoryLabels } from "../lib/catalog.js";
import { loadBundle, maskUrl } from "../lib/bundle.js";

const styles = { outline: "outline" };
const collator = new Intl.Collator("en", { numeric: true });
const plurals = new Intl.PluralRules("uk");
const iconNouns = { one: "іконка", few: "іконки", many: "іконок", other: "іконки" };
const find = (selector) => document.querySelector(selector);
const iconUrl = ({ name }, style) => `/${styles[style]}/${name}.svg`;
const stage = find(".stage");
const stageArt = find("#stage-art");
const workbench = find(".workbench");
const loadStatus = find("#load-status");
const size = find("#size");
const sizeValue = find("#size-value");
const catalog = find("#catalog");
const search = find("#search");
const categories = find(".categories");
const sort = find("#sort");
const stylePicker = find(".styles");
const languagePicker = find("#language");
const feedback = find("#feedback");
const download = find("#download");
const copy = find("#copy");
const copyLink = find("#copy-link");
const iconName = find("#icon-name");
const categoryTag = find("#category-tag");
const keywordTags = find("#keyword-tags");
const stroke = find("#stroke");
const strokeValue = find("#stroke-value");
const detail = find(".detail");
const detailContent = find("#detail-content");
const dialog = find(".mobile-detail");
const topicButtons = [...document.querySelectorAll("#topics button")];
const stacked = matchMedia("(max-width: 860px)");

let selected = null;
let request = 0;
let activeSource = "";
let language = "uk";
let activeStyle = "outline";
let strokeTouched = false;
let downloadUrl = "";
let packed = null;

const translatedAttrs = ["aria-label", "placeholder", "title", "content"];
const translations = Array.from(document.querySelectorAll(["[data-en]", ...translatedAttrs.map((name) => `[data-en-${name}]`)].join(",")), (node) => {
  const text = node.dataset.en && [node.textContent, node.dataset.en];
  const attrs = translatedAttrs.flatMap((name) =>
    node.hasAttribute(`data-en-${name}`) ? [[name, node.getAttribute(name), node.getAttribute(`data-en-${name}`)]] : [],
  );
  return { node, text, attrs };
});
const message = (uk, en) => language === "uk" ? uk : en;

function applyLanguage(nextLanguage) {
  language = nextLanguage === "en" ? "en" : "uk";
  document.documentElement.lang = language;
  document.title = message("бібліотека іконок · entiny icons", "icon library · entiny icons");
  languagePicker.value = language;
  for (const { node, text, attrs } of translations) {
    if (text) node.textContent = message(...text);
    for (const [name, uk, en] of attrs) node.setAttribute(name, message(uk, en));
  }
}

function syncUrl() {
  const url = new URL(location.href);
  if (language === "en") url.searchParams.set("lang", language);
  else url.searchParams.delete("lang");
  if (activeStyle !== "outline") url.searchParams.set("style", activeStyle);
  else url.searchParams.delete("style");
  if (selected) url.searchParams.set("icon", selected.name);
  else url.searchParams.delete("icon");
  history.replaceState(null, "", url);
}

function renderCatalog(preferred = selected, refresh = false) {
  const value = search.value.toLowerCase().trim();
  const query = value.split(/\s+/).filter(Boolean);
  const category = categories.querySelector("input:checked").value;
  const matches = entries.filter((icon) =>
    (category === "all" || category === icon.category) && matchesSearch(icon, query),
  );
  for (const button of topicButtons) {
    button.setAttribute("aria-pressed", String(value === button.textContent));
  }
  if (sort.value === "asc") matches.sort((a, b) => collator.compare(a.name, b.name));
  if (sort.value === "desc") matches.sort((a, b) => collator.compare(b.name, a.name));

  const nextIcon = matches.includes(preferred) ? preferred : matches[0];
  const noun = message(iconNouns[plurals.select(matches.length)], matches.length === 1 ? "icon" : "icons");
  find("#count").textContent = `${matches.length} ${noun}`;
  find("#empty").hidden = Boolean(nextIcon);

  catalog.replaceChildren(...matches.map((icon) => {
    const button = document.createElement("button");
    button.className = "catalog-item";
    button.type = "button";
    button.setAttribute("aria-pressed", String(icon === nextIcon));

    const swatch = document.createElement("span");
    swatch.className = "swatch";
    swatch.setAttribute("aria-hidden", "true");
    const inline = packed?.[styles[activeStyle]]?.[icon.name];
    swatch.style.setProperty("--icon", inline ? maskUrl(inline) : `url("${iconUrl(icon, activeStyle)}")`);

    const name = document.createElement("span");
    name.className = "catalog-name";
    name.textContent = icon.name;
    button.append(swatch, name);
    button.addEventListener("click", () => {
      const previous = catalog.querySelector('[aria-pressed="true"]');
      previous?.setAttribute("aria-pressed", "false");
      button.setAttribute("aria-pressed", "true");
      openIcon(icon);
      if (stacked.matches) dialog.showModal();
    });
    return button;
  }));

  if (!nextIcon) {
    request += 1;
    selected = null;
    workbench.hidden = true;
    loadStatus.hidden = true;
    syncUrl();
  } else if (nextIcon !== selected || refresh) {
    if (nextIcon !== selected) workbench.hidden = true;
    return openIcon(nextIcon);
  }
}

function placeDetail() {
  if (!stacked.matches && dialog.open) dialog.close();
  (stacked.matches ? dialog : detail).append(detailContent);
}

function filterByTag(keyword) {
  if (dialog.open) dialog.close();
  search.value = keyword;
  categories.querySelector('[value="all"]').checked = true;
  renderCatalog();
  search.focus();
}

async function openIcon(icon) {
  selected = icon;
  syncUrl();
  const currentRequest = ++request;
  const url = iconUrl(icon, activeStyle);
  const file = `${icon.name}.svg`;
  activeSource = "";
  copy.disabled = true;
  copyLink.disabled = true;
  download.removeAttribute("href");
  feedback.textContent = "";
  loadStatus.hidden = !workbench.hidden;
  loadStatus.textContent = message("завантажую іконку…", "loading icon…");

  try {
    let source = packed?.[styles[activeStyle]]?.[icon.name];
    if (!source) {
      const response = await fetch(url, { cache: "no-cache" });
      if (!response.ok) throw new Error("missing icon");
      source = await response.text();
    }
    const parsed = new DOMParser().parseFromString(source, "image/svg+xml");
    if (parsed.documentElement.localName !== "svg") throw new Error("invalid svg");
    if (currentRequest !== request) return;

    const svg = document.importNode(parsed.documentElement, true);
    svg.classList.add("stage-art-enter");
    stageArt.replaceChildren(svg);
    iconName.textContent = icon.name;
    find("#file-name").textContent = url.slice(1);
    categoryTag.textContent = categoryLabels[language][icon.category];
    keywordTags.replaceChildren(...icon.tags[language].map((keyword) => {
      const tag = document.createElement("button");
      tag.type = "button";
      tag.textContent = keyword;
      tag.addEventListener("click", () => filterByTag(keyword));
      return tag;
    }));

    download.download = file;
    const editorParams = new URLSearchParams({ icon: icon.name, style: styles[activeStyle] });
    find("#edit-icon").href = `/editor?${editorParams}`;
    activeSource = source;
    syncStroke(svg);
    refreshDownload();
    copy.disabled = false;
    copyLink.disabled = false;
    loadStatus.hidden = true;
    workbench.hidden = false;
  } catch {
    if (currentRequest !== request) return;
    workbench.hidden = true;
    loadStatus.textContent = message(`не вдалося відкрити ${file}. вибери іконку ще раз.`, `could not open ${file}. select the icon again.`);
    loadStatus.hidden = false;
  }
}

function syncStroke(svg) {
  const outlined = activeStyle === "outline";
  stroke.disabled = !outlined;
  const own = svg.getAttribute("stroke-width") ?? "1.5";
  if (outlined && !strokeTouched) stroke.value = own;
  strokeValue.value = outlined ? `${Number(strokeTouched ? stroke.value : own)} px` : "—";
  if (outlined && strokeTouched) svg.setAttribute("stroke-width", stroke.value);
}

function exportSource() {
  if (!activeSource) return "";
  const doc = new DOMParser().parseFromString(activeSource, "image/svg+xml");
  const root = doc.documentElement;
  root.setAttribute("width", size.value);
  root.setAttribute("height", size.value);
  if (activeStyle === "outline" && strokeTouched) root.setAttribute("stroke-width", stroke.value);
  return new XMLSerializer().serializeToString(root);
}

function refreshDownload() {
  if (downloadUrl) URL.revokeObjectURL(downloadUrl);
  downloadUrl = URL.createObjectURL(new Blob([exportSource()], { type: "image/svg+xml" }));
  download.href = downloadUrl;
}

function updateSize() {
  const pixels = `${size.value} px`;
  sizeValue.value = pixels;
  stage.style.setProperty("--icon-size", `${size.value}px`);
  if (activeSource) refreshDownload();
}

function updateStroke() {
  strokeTouched = true;
  const svg = stageArt.querySelector("svg");
  if (svg) syncStroke(svg);
  if (activeSource) refreshDownload();
}

size.addEventListener("input", updateSize);
stroke.addEventListener("input", updateStroke);
search.addEventListener("input", () => renderCatalog());
categories.addEventListener("change", () => renderCatalog());
sort.addEventListener("change", () => renderCatalog());
for (const button of topicButtons) {
  button.addEventListener("click", () => {
    const active = button.getAttribute("aria-pressed") === "true";
    filterByTag(active ? "" : button.textContent);
  });
}
document.addEventListener("keydown", (event) => {
  const editing = event.target.matches?.("input, textarea, select, [contenteditable]");
  const slash = event.key === "/" && !editing && !event.ctrlKey && !event.metaKey;
  const chord = event.key.toLowerCase() === "k" && (event.ctrlKey || event.metaKey);
  if (event.defaultPrevented || event.altKey || (!slash && !chord)) return;
  event.preventDefault();
  if (dialog.open) dialog.close();
  search.focus();
  search.select();
});
categoryTag.addEventListener("click", () => {
  if (dialog.open) dialog.close();
  search.value = "";
  categories.querySelector(`[value="${selected.category}"]`).checked = true;
  renderCatalog();
  search.focus();
});
find("#back-to-results").addEventListener("click", () => dialog.close());
stacked.addEventListener("change", placeDetail);
find("#toggle-guides").addEventListener("click", (event) => {
  const button = event.currentTarget;
  const enabled = button.getAttribute("aria-pressed") === "false";
  button.setAttribute("aria-pressed", String(enabled));
  stage.dataset.guides = enabled ? "on" : "off";
});
find("#reset-filters").addEventListener("click", () => {
  search.value = "";
  categories.querySelector('[value="all"]').checked = true;
  renderCatalog();
  search.focus();
});
stylePicker.addEventListener("change", (event) => {
  activeStyle = event.target.value;
  renderCatalog(selected, true);
});
languagePicker.addEventListener("change", () => {
  applyLanguage(languagePicker.value);
  renderCatalog(selected, true);
});
find(".surfaces").addEventListener("change", (event) => {
  stage.dataset.surface = event.target.value;
});
async function copyText(text, success, failure) {
  const currentRequest = request;
  let message;
  try {
    await navigator.clipboard.writeText(text);
    message = success;
  } catch {
    message = failure;
  }
  if (currentRequest === request) feedback.textContent = message;
}

copy.addEventListener("click", () => {
  copyText(exportSource(), message("svg скопійовано", "svg copied"), message("буфер обміну недоступний. збережи svg файлом.", "clipboard unavailable. download the svg instead."));
});
copyLink.addEventListener("click", () => {
  copyText(location.href, message("посилання скопійовано", "link copied"), message("не вдалося скопіювати посилання.", "could not copy the link."));
});

updateSize();
const params = new URLSearchParams(location.search);
applyLanguage(params.get("lang"));
const linkedIcon = entries.find((icon) => icon.name === params.get("icon"));
const linkedStyle = params.get("style");
if (Object.hasOwn(styles, linkedStyle)) activeStyle = linkedStyle;
stylePicker.querySelector(`[value="${activeStyle}"]`).checked = true;
placeDetail();
const start = (data) => {
  packed = data ?? null;
  renderCatalog(linkedIcon);
  if (linkedIcon && stacked.matches) dialog.showModal();
};
loadBundle().then(start, () => start());
