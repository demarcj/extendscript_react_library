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

function buildMain() {
  return esbuild.build(build_map);
}

module.exports = buildMain;

if (require.main === module) {
  buildMain().catch(() => process.exit(1));
}
