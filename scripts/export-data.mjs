// Dumps the site's content (src/data/site.ts + media.json) to data/site-data.json.
// Used by scripts/build-data-sheet.py to produce data/kunal-website-data.xlsx.
// Run: node scripts/export-data.mjs
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, "$1")), "..");
const require = createRequire(path.join(root, "package.json"));
const ts = require("typescript");

const src = fs.readFileSync(path.join(root, "src/data/site.ts"), "utf8");
const js = ts.transpileModule(src, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
}).outputText;

const mod = { exports: {} };
const localRequire = (p) => (p === "./media.json" ? require(path.join(root, "src/data/media.json")) : require(p));
new Function("require", "module", "exports", js)(localRequire, mod, mod.exports);

fs.mkdirSync(path.join(root, "data"), { recursive: true });
fs.writeFileSync(path.join(root, "data/site-data.json"), JSON.stringify(mod.exports, null, 2));
console.log("wrote data/site-data.json:", Object.keys(mod.exports).join(", "));
