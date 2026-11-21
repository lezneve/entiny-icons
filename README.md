# entiny-icons

Власний іконпак entinyGram: сітка 24 × 24, `currentColor`, контурні, суцільні та двотонові варіанти.
Правила малювання лежать в `AGENTS.md`.

Галерея читає категорії й пошукові теги з `catalog.json`. Пошук працює українською та англійською. Чернетки зберігаються в `icons/drafts/` для погодження.

Усі іконки лежать у `icons/`. Зараз у паку лише контурний стиль (`icons/outline/`). Заливку (`filled`) і duotone тимчасово прибрано, повернемо після доведення контурних. Копія filled лежить поза репозиторієм. Шляхи `svg/*`, `outline/*` тощо в `exports` збережені для наявних підключень. У `icons.json` варіанти мають суфікси `-outline` і `-solid`.

## Робота

- `bun run dev` — галерея (Astro) на http://127.0.0.1:3000
- `bun run site` — статична збірка галереї в `dist/`
- `bun run check` — перевірка svg (viewBox, заборонені теги, колір, transform)
- `bun run build` — збирає `icons.json` у форматі Iconify (`prefix: entiny`, `body` для кожної іконки)

`icons.json` комітиться разом із `icons/`, щоб споживачу не треба було збирати пак.

## Підключення з GitHub (без Iconify API)

У `entinyGram` пак стає звичайною залежністю з тегу:

    bun add github:lezneve/entiny-icons#v0.1.0

Після цього `node_modules/entiny-icons/icons.json` читається так само, як `@iconify/json/json/<set>.json`.
Оновлення: новий тег у цьому репозиторії, змінити версію в `package.json` entinyGram.

Альтернативи: git submodule або завантаження `icons.json` з релізу під час `bun run setup`.

## Ліцензія

MIT, див. `LICENSE`. Шрифт галереї Overused Grotesk іде під SIL OFL 1.1 (`fonts/`).
