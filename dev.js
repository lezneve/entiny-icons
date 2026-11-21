function serveFile(path) {
  return new Response(Bun.file(new URL(path, import.meta.url)), {
    headers: { "Cache-Control": "no-cache" },
  });
}

async function serveSvg(directory, filename) {
  if (/^[a-z0-9]+(?:-[a-z0-9]+)*\.svg$/.test(filename)) {
    const filePath = `./${directory}/${filename}`;
    const file = Bun.file(new URL(filePath, import.meta.url));
    if (await file.exists()) return serveFile(filePath);
  }
  return new Response(null, { status: 404 });
}

const server = Bun.serve({
  hostname: "127.0.0.1",
  port: 3000,
  routes: {
    "/": () => serveFile("./index.html"),
    "/entinygram": () => serveFile("./entinygram.html"),
    "/gallery.js": () => serveFile("./gallery.js"),
    "/gallery.css": () => serveFile("./gallery.css"),
    "/appearance.css": () => serveFile("./appearance.css"),
    "/fonts/overused-grotesk.woff2": () => serveFile("./fonts/overused-grotesk.woff2"),
    "/svg/:file": ({ params }) => serveSvg("svg", params.file),
    "/drafts/:file": ({ params }) => serveSvg("drafts", params.file),
  },
});

console.log(`галерея іконок · ${server.url}`);
