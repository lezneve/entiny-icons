import { defineConfig } from "astro/config";
import { cp, readFile, readdir, stat, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join, resolve } from "node:path";
import { STYLES, compose } from "./src/lib/compose.js";

const root = fileURLToPath(new URL(".", import.meta.url));
const packDirs = ["outline", "fonts"];
const safeName = /^[a-z0-9]+(?:-[a-z0-9]+)*\.(svg|woff2)$/;
const iconName = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const types = { svg: "image/svg+xml", woff2: "font/woff2" };
const diskDir = (dir) => resolve(root, dir === "fonts" ? "fonts" : join("icons", dir));

function send(res, status, type, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", type);
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.end(body);
}

async function api(url, res) {
  if (url.pathname === "/api/icons") {
    const names = (await readdir(diskDir("outline"))).filter((f) => f.endsWith(".svg")).map((f) => f.slice(0, -4)).sort();
    return send(res, 200, "application/json; charset=utf-8", JSON.stringify({ styles: ["outline"], icons: names }));
  }
  const name = url.searchParams.get("name") ?? "";
  const style = STYLES[url.searchParams.get("style") ?? "outline"];
  if (!iconName.test(name) || !style) return send(res, 400, "text/plain; charset=utf-8", "name and style are required, see /editor");
  const params = url.searchParams;
  try {
    const source = await readFile(resolve(diskDir(style), `${name}.svg`), "utf8");
    send(res, 200, types.svg, compose(source, {
      color: params.get("color") ?? undefined,
      bg: params.get("bg") ?? undefined,
      bgOpacity: params.get("opacity") ?? undefined,
      radius: params.get("radius") ?? undefined,
      scale: params.get("scale") ?? undefined,
      weight: params.get("weight") ?? undefined,
      size: params.get("size") ?? undefined,
    }));
  } catch {
    send(res, 404, "text/plain; charset=utf-8", `icon not found: ${style}/${name}`);
  }
}

async function bundle() {
  const out = {};
  for (const style of ["outline"]) {
    const dir = diskDir(style);
    out[style] = {};
    for (const file of (await readdir(dir)).filter((f) => f.endsWith(".svg")).sort()) {
      out[style][file.slice(0, -4)] = (await readFile(resolve(dir, file), "utf8")).trim();
    }
  }
  return JSON.stringify(out);
}

function packFiles() {
  return {
    name: "pack-files",
    hooks: {
      "astro:server:setup": ({ server }) => {
        server.middlewares.use(async (req, res, next) => {
          const url = new URL(req.url ?? "/", "http://localhost");
          if (url.pathname === "/bundle.json") return send(res, 200, "application/json; charset=utf-8", await bundle());
          if (url.pathname === "/api/icon" || url.pathname === "/api/icons") return api(url, res);
          const [, dir, file] = url.pathname.split("/");
          if (!packDirs.includes(dir) || !file || !safeName.test(file)) return next();
          try {
            const path = resolve(diskDir(dir), file);
            if (!(await stat(path)).isFile()) return next();
            send(res, 200, types[file.split(".").pop()], await readFile(path));
          } catch {
            next();
          }
        });
      },
      "astro:build:done": async ({ dir }) => {
        const out = fileURLToPath(dir);
        await writeFile(join(out, "bundle.json"), await bundle());
        for (const name of packDirs) await cp(diskDir(name), join(out, name), { recursive: true });
      },
    },
  };
}

export default defineConfig({
  server: { host: "127.0.0.1", port: 3000 },
  integrations: [packFiles()],
});
