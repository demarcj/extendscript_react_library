const esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["./ts/hostscript.ts"],
  bundle: true,
  outfile: "jsx/hostscript.jsx",
  platform: "neutral",
  target: ["es5"],
  format: "cjs",
  treeShaking: false,
  minify: false,
}).catch(() => process.exit(1));

esbuild.build({
  entryPoints: ["tsx/app.tsx"],
  bundle: true,
  outfile: "js/main.js",
  format: "iife",
  platform: "browser",
  target: ["chrome91"],
  jsx: "automatic",
  sourcemap: true,
}).catch(() => process.exit(1));
