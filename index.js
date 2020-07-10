const { createVM } = require("./vm");

function loadBytecode() {
  const moduleName = process.argv[2];

  try {
    return require(moduleName);
  } catch (e) {
    console.error(`Error: Cannot find '${moduleName}'.`);
    process.exit(1);
  }
}

if (process.argv.length !== 3) {
  console.log("Usage: node index.js ./example-bytecode/fibonacci");
  process.exit(1);
}

const builtins = {
  print: console.log,
};

const vm = createVM(loadBytecode(), builtins);
vm.run();
