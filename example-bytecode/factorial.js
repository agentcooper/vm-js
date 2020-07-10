// @ts-check
const I = require("../instructions");
module.exports = new Int8Array([
  I.CONST,
  10,
  I.CALL,
  /* factorial */ 7,
  1,
  I.PRINT,
  I.HALT,
  I.LOAD, // factorial start
  -3,
  I.CONST,
  1,
  I.SUB,
  I.JUMP_IF_NOT_ZERO,
  17,
  I.CONST,
  1,
  I.RETURN,
  /* n */ I.LOAD,
  -3,
  /* factorial(n - 1) */ I.LOAD,
  -3,
  I.CONST,
  1,
  I.SUB,
  I.CALL,
  /* factorial */ 7,
  1,
  I.MUL,
  I.RETURN, // factorial end
]);
