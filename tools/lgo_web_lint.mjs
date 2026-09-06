#!/usr/bin/env node
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const roots = process.argv.slice(2);
const targets = roots.length ? roots : ["."];
const blockedDirs = new Set(["node_modules", ".next", "dist", "build", "coverage", "__pycache__", ".git", ".turbo"]);
const extensions = new Set([".js", ".mjs", ".cjs", ".ts", ".tsx"]);
const failures = [];

function extname(name) {
  const idx = name.lastIndexOf(".");
  return idx >= 0 ? name.slice(idx) : "";
}

function walk(path) {
  const st = statSync(path);
  if (st.isDirectory()) {
    const name = path.split(/[\\/]/).pop();
    if (blockedDirs.has(name)) return;
    for (const child of readdirSync(path)) walk(join(path, child));
    return;
  }
  if (!st.isFile() || !extensions.has(extname(path))) return;
  const text = readFileSync(path, "utf8");
  const rel = relative(process.cwd(), path);
  if (/\bvar\s+/.test(text)) failures.push(`${rel}: use let/const instead of var`);
  if (/TODO\(unsafe\)|fixture-as-contract|PRODUCTION_AUTH_CLAIM|DB_PERSISTENCE_CLAIM/.test(text)) {
    failures.push(`${rel}: forbidden claim or unsafe marker`);
  }
  if (text.includes("\t")) failures.push(`${rel}: tab indentation is not allowed`);
}

for (const target of targets) walk(target);

if (failures.length) {
  console.error("LGO WEB LINT FAIL");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log("LGO WEB LINT PASS");
