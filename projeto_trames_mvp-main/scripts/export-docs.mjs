import { cp, mkdir } from "node:fs/promises";
const source = new URL("../dist-pages/", import.meta.url);
const destination = new URL("../docs/", import.meta.url);
// Preserva arquivos adicionais já presentes em docs.
await mkdir(destination, { recursive: true });
await cp(source, destination, { recursive: true });
console.log("Pasta docs pronta para enviar ao GitHub (main /docs).");
