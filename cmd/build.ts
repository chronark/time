// ex. scripts/build_npm.ts
import { build } from "https://deno.land/x/dnt/mod.ts";

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  package: {
    // package.json properties
    name: "@chronark/time",
    version: Deno.args[0],
    description: "Time utilities inspired by go's time standard library",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/chronark/time.git",
    },
    bugs: {
      url: "https://github.com/chronark/time/issues",
    },
  },
});

// post build steps
// Deno.copyFileSync("LICENSE", "npm/LICENSE");
// Deno.copyFileSync("README.md", "npm/README.md");
