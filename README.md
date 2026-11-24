# entiny-icons

Власний контурний іконпак entinyGram на сітці 24 × 24 з `currentColor`.
Правила малювання лежать в `AGENTS.md`.

Галерея читає категорії й пошукові теги з `catalog.json`. Пошук працює українською та англійською. Чернетки зберігаються в `icons/drafts/` для погодження.

Готові SVG лежать у `icons/outline/` і доступні через `outline/*`. Назви в `icons.json` збігаються з назвами файлів без розширення.

## Робота

- `bun run dev` — галерея (Astro) на http://127.0.0.1:3000
- `bun run site` — статична збірка галереї в `dist/`
- `bun run check` — перевірка svg (viewBox, заборонені теги, колір, transform)
- `bun run build` — збирає `icons.json` у форматі Iconify (`prefix: entiny`, `body` для кожної іконки)

`icons.json` комітиться разом із `icons/`, щоб споживачу не треба було збирати пак.

## Підключення з GitHub (без Iconify API)

У `entinyGram` пак стає звичайною залежністю з тегу:

    bun add github:lezneve/entiny-icons#v1.1.0

Після цього `node_modules/entiny-icons/icons.json` читається так само, як `@iconify/json/json/<set>.json`.
Оновлення: новий тег у цьому репозиторії, змінити версію в `package.json` entinyGram.

Альтернативи: git submodule або завантаження `icons.json` з релізу під час `bun run setup`.

## Ліцензія

MIT, див. `LICENSE`. Шрифт галереї Overused Grotesk іде під SIL OFL 1.1 (`fonts/`).

## Іконпак для Telegram

`bun run telegram` збирає `dist/entiny.icons` (zip з `metadata.json` і svg, формат такий самий, як у пака solar в entinyGram). Відповідність імен ресурсів Telegram і наших іконок лежить у `telegram/map.txt`: рядок `msg_settings settings`. Ключ, якого там немає, лишається стоковою іконкою Telegram. Колір у svg білий, застосунок фарбує сам.

Для дрібних чи прямокутних слотів можна вписати `min-x min-y width height` після назви іконки. Наприклад, `msg_views eye 1 4.25 22 15.5` прибирає зайві поля навколо ока в лічильнику переглядів. Позначення `@name` бере SVG із `telegram/assets/` для ресурсів, яким потрібна окрема форма.

Підключення: імпортувати `entiny.icons` у налаштуваннях іконпаків, або покласти svg і `metadata.json` у `src/res/icon-packs/entiny/` entinyGram та виконати `bun run generate-icon-packs`.
