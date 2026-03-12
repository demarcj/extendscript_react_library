const esbuild = require("esbuild");

const build_map = {
  entryPoints: ["./ts/hostscript.ts"],
  bundle: true,
  outfile: "jsx/hostscript.jsx",
  platform: "neutral",
  target: ["es5"],
  format: "cjs",
  treeShaking: false,
  minify: false,
};

const build_hostscript = () => esbuild.build(build_map);

module.exports = build_hostscript;

if (require.main === module) {
  build_hostscript().catch(() => process.exit(1));
}
