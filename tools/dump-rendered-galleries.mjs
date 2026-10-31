import { getProjectPhotos } from "@/lib/content/photos.ts";
import manifest from "@images/manifest.json";

const dirs = manifest.projects.map((p) => p.dir);
const result = {};
for (const dir of dirs) {
  result[dir] = getProjectPhotos(dir);
}
process.stdout.write(JSON.stringify(result));
