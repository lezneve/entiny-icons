import catalogData from "../../catalog.json" with { type: "json" };

export const categoryLabels = {
  uk: { logos: "логотипи", chat: "чат", media: "медіа", people: "люди", privacy: "приватність", ai: "ші", network: "мережа", files: "файли", settings: "налаштування", text: "текст", arrows: "стрілки", numbers: "цифри", money: "гроші", interface: "інтерфейс" },
  en: { logos: "logos", chat: "chat", media: "media", people: "people", privacy: "privacy", ai: "ai", network: "network", files: "files", settings: "settings", text: "text", arrows: "arrows", numbers: "numbers", money: "money", interface: "interface" },
};
export const categories = Object.keys(categoryLabels.en);
export const entries = categories.flatMap((category) =>
  Object.entries(catalogData[category]).map(([name, tags]) => ({ name, category, tags })),
);

export function matchesSearch({ name, tags }, words) {
  const terms = [name, ...tags.uk, ...tags.en];
  return words.every((word) => terms.some((term) => term.toLowerCase().includes(word)));
}
