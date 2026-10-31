import { pathToFileURL } from "node:url";
import { resolve as pathResolve } from "node:path";
import { readFileSync } from "node:fs";

const root = process.cwd();

export async function resolve(specifier, context, nextResolve) {
  if (specifier === "@images/manifest.json") {
    return {
      url: pathToFileURL(pathResolve(root, "images-optimizado/manifest.json")).href,
      shortCircuit: true,
    };
  }
  if (specifier.startsWith("@/")) {
    const subpath = specifier.slice(2);
    const resolvedPath = pathResolve(root, "src", subpath);
    return nextResolve(pathToFileURL(resolvedPath).href, context);
  }
  return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  if (url.endsWith("manifest.json")) {
    const content = readFileSync(pathResolve(root, "images-optimizado/manifest.json"), "utf8");
    return {
      format: "module",
      source: `export default ${content};`,
      shortCircuit: true,
    };
  }
  return nextLoad(url, context);
}
