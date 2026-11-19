import { access, copyFile, readFile, rename, writeFile } from "node:fs/promises";

const directory = new URL("../dist-pages/", import.meta.url);
await rename(new URL("pages.html", directory), new URL("index.html", directory));
const html = await readFile(new URL("index.html", directory), "utf8");
if (!html.includes("./assets/") || !html.includes('id="root"')) {
  throw new Error("A saída estática não contém a entrada esperada.");
}
await access(new URL("favicon.png", directory));
await copyFile(new URL("index.html", directory), new URL("404.html", directory));
await writeFile(new URL(".nojekyll", directory), "");
console.log("GitHub Pages pronto: dist-pages/index.html");
