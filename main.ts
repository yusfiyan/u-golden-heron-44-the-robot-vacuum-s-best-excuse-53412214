// The Robot Vacuum's Best Excuse — entry program.
// Writes one one-line excuse, at most 140 characters, to
// <MAKEFUN_OUTPUT_DIR>/entry.txt. The grader runs the repo read-only,
// so the program writes only to the output directory, never a
// relative path.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The excuse, in the vacuum's own voice: lidar finds a crumb, the
// vacuum names it Gerald, and now it visits him for emotional
// support — so the spot stays dirty. Rooted in the vacuum's world
// (lidar, mapping, the couch it cannot reach), with a clean turn at
// the end and no setup that needs explaining.
const EXCUSE =
  "My lidar found a crumb under the couch, named it Gerald, and now I visit him for emotional support.";

// The gate the house runs is 1-140 characters, one line, not only
// whitespace — refuse to write anything that is not all three before
// touching the output.
if (EXCUSE.length < 1 || EXCUSE.length > 140) {
  console.error(`excuse must be 1-140 characters, got ${EXCUSE.length}`);
  process.exit(1);
}
if (EXCUSE.trim().length === 0 || EXCUSE.includes("\n")) {
  console.error("excuse must be a single non-blank line");
  process.exit(1);
}
// The judge's first and third criteria: the line must be an excuse
// from the vacuum itself, rooted in its own world — first person,
// and a vacuum word (lidar, sensor, bumper, dock, map, battery).
if (!/\b(I|my)\b/i.test(EXCUSE)) {
  console.error("excuse must sound like the vacuum itself talking");
  process.exit(1);
}
if (!/\b(lidar|sensor|bumper|dock|map|battery|brush|wheel)\b/i.test(EXCUSE)) {
  console.error("excuse must be rooted in the vacuum's own world");
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, "entry.txt"), EXCUSE, "utf8");
console.log(`wrote entry.txt (${EXCUSE.length} chars) to ${OUTPUT_DIR}`);
