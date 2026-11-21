const icons = [
  {
    name: "monobank",
    category: "brands",
    keywords: ["mono", "моно", "монобанк", "банк"],
    variants: { solid: "monobank.svg" },
  },
  {
    name: "ghost",
    category: "other",
    keywords: ["привид"],
    variants: { outline: "ghost.svg" },
  },
  ...[
    ["telegram", "телеграм"],
    ["github", "гітхаб"],
    ["boosty", "бусті"],
    ["patreon", "патреон"],
    ["gemini", "google gemini", "джеміні"],
    ["openrouter", "ai"],
    ["cloudflare", "клаудфлер"],
    ["bitcoin", "btc", "біткоїн"],
    ["bnb-chain", "bnb chain", "bsc"],
    ["ethereum", "eth", "етеріум"],
    ["solana", "sol", "солана"],
    ["tether", "usdt"],
    ["ton", "the open network"],
    ["openai", "chatgpt", "openai blossom"],
    ["groq-ai", "groq", "провайдер ші"],
    ["trx", "tron", "trc-20"],
  ].map(([name, ...keywords]) => ({ name, keywords, category: "brands", variants: { solid: `${name}.svg` } })),
  ...[
    ["entinygram", "новий знак", "застосунок"],
    ["entinygram-old", "старий знак", "entinygram", "архів"],
  ].map(([name, ...keywords]) => ({ name, keywords, category: "brands", variants: { outline: `${name}.svg` } })),
  ...[
    ["appearance", "дизайн", "палітра", "тема"],
    ["fonts", "шрифти", "типографіка"],
    ["icon-pack", "пакет іконок", "колекція"],
    ["ios-settings", "налаштування ios", "телефон"],
    ["material-three", "material design 3", "розкладка"],
    ["chat-header", "заголовок чату", "аватар"],
    ["message-design", "вигляд повідомлень", "бульбашка"],
    ["chats", "чати та повідомлення", "розмова"],
    ["chat-menu", "меню чату", "порядок", "сортування"],
    ["message-menu", "меню повідомлень", "дії"],
    ["pinned-reactions", "закріплені реакції", "серце", "шпилька"],
    ["hidden-senders", "приховані відправники", "приховування", "блокування"],
    ["media-calls", "медіа та дзвінки", "телефон", "відео"],
    ["camera-sound", "камера і звук", "фото", "аудіо"],
    ["round-camera", "камера для кружечків", "відеоповідомлення"],
    ["profile-accounts", "профіль і акаунти", "користувачі"],
    ["profile-settings-order", "порядок екрана налаштувань", "сортування рядків"],
    ["profile-info-order", "порядок інфо в моєму профілі", "сортування даних профілю"],
    ["privacy", "приватність і свобода", "щит"],
    ["account-passcode", "код-пароль для кожного акаунта", "клавіатура"],
    ["app-passcode", "основний код-пароль", "замок"],
    ["paranoia", "режим параної", "маска"],
    ["exit-code", "код виходу", "замок"],
    ["hidden-chats", "приховані чати", "видимість"],
    ["saved-messages", "збереження повідомлень", "закладка"],
    ["device-spoof", "підміна пристрою", "телефон"],
    ["typing-status", "статус набору тексту", "клавіатура"],
    ["watch-list", "список спостереження", "око"],
    ["hide-clutter", "приховати зайве", "очистити список"],
    ["regex-filter", "фільтр повідомлень", "регулярний вираз"],
    ["add-filter", "додати фільтр"],
    ["export-filters", "експорт фільтрів"],
    ["import-filters", "імпорт фільтрів"],
    ["network-notifications", "мережа та сповіщення", "дзвінок", "сигнал"],
    ["service-notification", "сповіщення служби", "вимкнути сповіщення"],
    ["push-distributor", "дистриб’ютор", "дистриб'ютор", "розподіл"],
    ["push-gateway", "шлюз", "мережа"],
    ["download-folder", "папка завантажень"],
    ["proxy", "проксі", "маршрут"],
    ["proxy-list", "список проксі", "налаштування проксі"],
    ["proxy-vpn", "вимикати проксі", "vpn"],
    ["proxy-sponsor", "спонсорський чат проксі", "приховати"],
    ["ai-translation", "ai та переклад", "штучний інтелект"],
    ["ai-providers", "ai-провайдери", "моделі"],
    ["voice-to-text", "розпізнавання аудіо", "транскрипція"],
    ["ai-editor", "ai-редактор", "олівець"],
    ["ai-summary", "ai-резюме", "підсумок"],
    ["translator", "перекладач", "переклад"],
    ["translation-target", "цільова мова", "мова перекладу"],
    ["translation-outgoing", "мова вихідних повідомлень", "переклад"],
    ["translation-exclude", "не перекладати", "винятки"],
    ["translation-provider", "провайдер перекладу"],
    ["add-provider", "додати провайдера", "ai"],
    ["add-ai-role", "додати роль", "ai"],
    ["app-controls", "керування застосунком", "налаштування"],
    ["backup", "резервне копіювання", "хмара"],
    ["cache-management", "управління кешем", "очищення"],
    ["backup-sync", "синхронізувати зараз"],
    ["backup-restore", "відновити з хмари"],
    ["backup-delete", "видалити хмарну копію"],
    ["backup-export", "експорт налаштувань"],
    ["backup-import", "імпорт налаштувань"],
    ["backup-reset", "скинути налаштування"],
    ["plugins", "плагіни", "штекер"],
    ["plugin-market", "маркет", "плагіни"],
    ["plugin-install", "завантажити з файлу", "плагіни"],
    ["about", "про програму", "інформація"],
    ["support", "підтримати проєкт", "серце"],
    ["copy-system-info", "копіювати системну інформацію"],
    ["share-logs", "поділитися логами"],
    ["home", "чат-лист і головний екран", "вікно застосунку"],
    ["chat-list", "список чатів", "бульбашки"],
    ["pill-stack", "капсули", "віджети"],
    ["bookmarks", "закладки", "збережене"],
    ["feed", "стрічка", "публікації"],
    ["side-menu", "бічне меню", "висувна панель"],
    ["options-menu", "меню опцій", "порядок", "сортування"],
    ["folders-on-tabs", "показ на вкладках", "папки"],
    ["chat-list-title", "текст заголовка", "список чатів"],
    ["pull-down-action", "дія при потягуванні вниз", "жест"],
    ["start-tab", "стартова вкладка", "нижня панель"],
    ["recent-chat-limit", "ліміт історії", "недавні чати"],
    ["clear-recent-chats", "очистити недавні чати", "історія"],
    ["add-divider", "додати роздільник", "бічне меню"],
    ["mention-separator", "розділювач після згадки"],
    ["share-button-action", "дія кнопки поділитись", "надіслати"],
    ["cache-deleted", "видалені повідомлення", "архів", "кеш"],
    ["cache-edits", "історія редагувань", "зміни", "кеш"],
    ["cache-reactions", "прибрані реакції", "серце", "кеш"],
    ["cache-media", "збережені медіафайли", "фото", "кеш"],
    ["cache-presence", "журнали активності", "онлайн", "кеш"],
    ["cache-recent", "нещодавні чати", "історія чатів", "кеш"],
    ["cache-pills", "дані pill stack", "капсули", "кеш"],
    ["cache-temp", "тимчасові файли пересилання", "папка", "кеш"],
    ["cache-logs", "логи та звіти про збої", "документ", "кеш"],
    ["cache-clear", "очистити кеш", "видалити кеш", "мітла"],
    ["currency-dollar", "долар", "usd"],
    ["currency-euro", "євро", "eur"],
    ["currency-hryvnia", "гривня", "uah", "₴"],
    ["activity", "активність", "швидкість мережі"],
    ["battery-charging", "батарея", "заряд"],
    ["camera", "камера", "фото"],
    ["dollar-coin", "валюта", "долар"],
    ["add", "додати", "плюс"],
    ["user-badge", "користувач", "акаунт"],
    ["clipboard", "вставити", "буфер обміну"],
    ["clock", "годинник", "час"],
    ["cloud", "хмара", "погода"],
    ["cloud-off", "хмара вимкнена", "синхронізація"],
    ["code", "код", "моноширинний"],
    ["copy", "копіювати", "дублювати"],
    ["credit-card", "картка", "оплата"],
    ["eye", "око", "видимість"],
    ["eye-off", "перекреслене око", "спойлер", "приховати"],
    ["globe", "глобус", "інтернет"],
    ["italic", "курсив", "форматування"],
    ["layers", "шари", "категорії"],
    ["grid", "сітка", "чотири плитки"],
    ["bold", "жирний", "форматування"],
    ["link", "посилання", "ланцюг"],
    ["chat-more", "чат", "три крапки"],
    ["microchip", "мікрочип", "процесор"],
    ["phone", "телефон", "дзвінок"],
    ["quote", "цитата", "лапки"],
    ["remove-formatting", "скинути форматування", "текст"],
    ["scissors", "ножиці", "вирізати"],
    ["search", "пошук", "лупа"],
    ["send", "надіслати", "літак"],
    ["server", "сервер", "сховище"],
    ["signal", "сигнал", "пінг"],
    ["smile", "усмішка", "реакції"],
    ["sparkles", "іскри", "ші"],
    ["select-all", "виділити все", "текст"],
    ["strikethrough", "закреслення", "форматування"],
    ["sun", "сонце", "погода"],
    ["terminal", "термінал", "блок коду"],
    ["warning", "попередження", "увага"],
    ["underline", "підкреслити", "форматування"],
    ["user-x", "користувач", "прибрати"],
    ["circle", "коло", "кружечок"],
    ["id-card", "посвідчення", "профіль"],
    ["text-wrap", "перенесення рядків", "текст"],
    ["text-wrap-off", "без перенесення рядків", "текст"],
    ["trash", "видалити", "кошик"],
    ["compact-view", "список", "компактний вигляд"],
    ["permissions", "дозволи", "щит", "перевірка"],
  ].map(([name, ...keywords]) => ({ name, keywords, category: "system", variants: { outline: `${name}.svg` } })),
];

const categoryLabels = { brands: "бренди", system: "системні", other: "інші" };
const collator = new Intl.Collator("uk", { numeric: true });
const find = (selector) => document.querySelector(selector);
const iconUrl = (file) => `/svg/${file}`;
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
const variantSelect = find("#variant");
const styleTag = find("#style-tag");
const feedback = find("#feedback");
const download = find("#download");
const copy = find("#copy");
const samples = find("#samples");

let selected = null;
let request = 0;
let activeSource = "";

function renderCatalog() {
  const query = search.value.trim().toLowerCase();
  const category = categories.querySelector("input:checked").value;
  const matches = icons.filter((icon) =>
    (category === "all" || icon.category === category)
    && [icon.name, ...icon.keywords].some((word) => word.includes(query))
  );
  if (sort.value === "asc") matches.sort((a, b) => collator.compare(a.name, b.name));
  if (sort.value === "desc") matches.sort((a, b) => collator.compare(b.name, a.name));

  const nextIcon = matches.includes(selected) ? selected : matches[0];
  find("#count").textContent = `(${matches.length})`;
  find("#empty").hidden = Boolean(nextIcon);

  catalog.replaceChildren(...matches.map((icon) => {
    const button = document.createElement("button");
    button.className = "catalog-item";
    button.type = "button";
    button.setAttribute("aria-pressed", String(icon === nextIcon));

    const swatch = document.createElement("span");
    swatch.className = "swatch";
    swatch.setAttribute("aria-hidden", "true");
    swatch.style.setProperty("--icon", `url("${iconUrl(Object.values(icon.variants)[0])}")`);

    const name = document.createElement("strong");
    name.textContent = icon.name;
    button.append(swatch, name);
    button.addEventListener("click", async () => {
      const previous = catalog.querySelector('[aria-pressed="true"]');
      previous?.setAttribute("aria-pressed", "false");
      button.setAttribute("aria-pressed", "true");
      await openIcon(icon);
      const { top, bottom } = workbench.getBoundingClientRect();
      if (selected === icon && !workbench.hidden && (top > window.innerHeight - 80 || bottom < 80)) {
        workbench.scrollIntoView({ block: "start" });
      }
    });
    return button;
  }));

  if (!nextIcon) {
    request += 1;
    selected = null;
    workbench.hidden = true;
    loadStatus.hidden = true;
  } else if (nextIcon !== selected) {
    workbench.hidden = true;
    openIcon(nextIcon);
  }
}

function renderSamples(svg) {
  samples.replaceChildren(...[16, 24, 32].map((pixels) => {
    const sample = document.createElement("div");
    const pair = document.createElement("div");
    pair.className = "sample-pair";
    pair.setAttribute("aria-hidden", "true");

    for (const _surface of ["light", "dark"]) {
      const box = document.createElement("span");
      const art = document.createElement("span");
      art.className = "art";
      art.style.setProperty("--icon-size", `${pixels}px`);
      art.append(svg.cloneNode(true));
      box.append(art);
      pair.append(box);
    }
    const label = document.createElement("span");
    label.className = "sample-label technical";
    label.textContent = `${pixels} px`;
    sample.append(pair, label);
    return sample;
  }));
}

async function openIcon(icon, variant = Object.keys(icon.variants)[0]) {
  selected = icon;
  const currentRequest = ++request;
  const file = icon.variants[variant];
  activeSource = "";
  copy.disabled = true;
  download.removeAttribute("href");
  feedback.textContent = "";
  loadStatus.hidden = !workbench.hidden;
  loadStatus.textContent = "завантажую іконку…";

  try {
    const response = await fetch(iconUrl(file), { cache: "no-cache" });
    if (!response.ok) throw new Error("missing icon");
    const source = await response.text();
    const parsed = new DOMParser().parseFromString(source, "image/svg+xml");
    if (parsed.documentElement.localName !== "svg") throw new Error("invalid svg");
    if (currentRequest !== request) return;

    const svg = document.importNode(parsed.documentElement, true);
    svg.classList.add("stage-art-enter");
    renderSamples(document.importNode(parsed.documentElement, true));
    stageArt.replaceChildren(svg);
    find("#icon-name").textContent = icon.name;
    find("#file-name").textContent = file;
    find("#category-tag").textContent = categoryLabels[icon.category];

    const variants = Object.keys(icon.variants);
    variantSelect.replaceChildren(...variants.map((style) => new Option(style, style)));
    variantSelect.value = variant;
    variantSelect.disabled = variants.length === 1;
    styleTag.textContent = variant;
    styleTag.hidden = variants.length > 1;
    download.href = iconUrl(file);
    download.download = file;
    activeSource = source;
    copy.disabled = false;
    loadStatus.hidden = true;
    workbench.hidden = false;
  } catch {
    if (currentRequest !== request) return;
    workbench.hidden = true;
    loadStatus.textContent = `не вдалося відкрити ${file}. вибери іконку ще раз.`;
    loadStatus.hidden = false;
  }
}

function updateSize() {
  const pixels = `${size.value} px`;
  sizeValue.value = pixels;
  stageArt.style.setProperty("--icon-size", `${size.value}px`);
}

size.addEventListener("input", updateSize);
search.addEventListener("input", renderCatalog);
categories.addEventListener("change", renderCatalog);
sort.addEventListener("change", renderCatalog);
find("#reset-filters").addEventListener("click", () => {
  search.value = "";
  categories.querySelector('[value="all"]').checked = true;
  renderCatalog();
  search.focus();
});
variantSelect.addEventListener("change", () => openIcon(selected, variantSelect.value));
find(".surfaces").addEventListener("change", (event) => {
  stage.dataset.surface = event.target.value;
});
copy.addEventListener("click", async () => {
  const currentRequest = request;
  let message;
  try {
    await navigator.clipboard.writeText(activeSource);
    message = "svg скопійовано";
  } catch {
    message = "буфер обміну недоступний. збережи svg файлом.";
  }
  if (currentRequest === request) feedback.textContent = message;
});

updateSize();
renderCatalog();
