# entiny-icons

Власний іконпак entinyGram: один стиль, сітка 24 × 24, `currentColor`.
Правила малювання лежать в `AGENTS.md`.

## Робота

- `bun run dev` — галерея на http://127.0.0.1:3000
- `bun run check` — перевірка svg (viewBox, заборонені теги, колір, transform)
- `bun run build` — збирає `icons.json` у форматі Iconify (`prefix: entiny`, `body` для кожної іконки)

`icons.json` комітиться разом із `svg/`, щоб споживачу не треба було збирати пак.

## Підключення з GitHub (без Iconify API)

У `entinyGram` пак стає звичайною залежністю з тегу:

    bun add github:lezneve/entiny-icons#v0.1.0

Після цього `node_modules/entiny-icons/icons.json` читається так само, як `@iconify/json/json/<set>.json`.
Оновлення: новий тег у цьому репозиторії, змінити версію в `package.json` entinyGram.

Альтернативи: git submodule або завантаження `icons.json` з релізу під час `bun run setup`.

## Ліцензія

MIT, див. `LICENSE`. Шрифт галереї Overused Grotesk іде під SIL OFL 1.1 (`fonts/`).
