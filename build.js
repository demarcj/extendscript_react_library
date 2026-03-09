const buildHostscript = require("./build_hostscript");
const buildMain = require("./build_main");

async function buildAll() {
  await buildHostscript();
  await buildMain();
}

module.exports = buildAll;

if (require.main === module) {
  buildAll().catch(() => process.exit(1));
}
