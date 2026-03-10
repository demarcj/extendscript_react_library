const esbuild = require("esbuild");

const build_map = {
  entryPoints: ["tsx/app.tsx"],
  bundle: true,
  outfile: "js/main.js",
  format: "iife",
  platform: "browser",
  target: ["chrome91"],
  jsx: "automatic",
  sourcemap: true,
};

const build_main = () => esbuild.build(build_map);

module.exports = build_main;

if (require.main === module) {
  build_main().catch(() => process.exit(1));
}
