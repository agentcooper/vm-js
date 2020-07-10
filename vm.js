// @ts-check
const I = require("./instructions");

/**
 * @param {Int8Array} code
 * @param {Record<string, Function>} builtins
 */
function createVM(code, builtins) {
  /** Instruction pointer. */
  let ip = 0;
  /** Stack pointer. */
  let sp = -1;
  /** Stack frame. */
  let fp = 0;

  let stack = new Int32Array(256);

  function run() {
    while (ip < code.length) {
      const instruction = code[ip++];
      switch (instruction) {
        case I.CONST: {
          const op_value = code[ip++];
          stack[++sp] = op_value;
          break;
        }
        case I.ADD: {
          const op1 = stack[sp--];
          const op2 = stack[sp--];
          stack[++sp] = op1 + op2;
          break;
        }
        case I.MUL: {
          const op1 = stack[sp--];
          const op2 = stack[sp--];
          stack[++sp] = op1 * op2;
          break;
        }
        case I.SUB: {
          const op1 = stack[sp--];
          const op2 = stack[sp--];
          stack[++sp] = op2 - op1;
          break;
        }
        case I.PRINT: {
          const value = stack[sp--];
          builtins.print(value);
          break;
        }
        case I.HALT: {
          return;
        }
        case I.CALL: {
          const op1_address = code[ip++];
          const op2_numberOfArguments = code[ip++];

          stack[++sp] = op2_numberOfArguments;
          stack[++sp] = fp;
          stack[++sp] = ip;

          fp = sp;
          ip = op1_address;
          break;
        }
        case I.RETURN: {
          const returnValue = stack[sp--];
          sp = fp;

          ip = stack[sp--];
          fp = stack[sp--];
          const number_of_arguments = stack[sp--];

          sp -= number_of_arguments;
          stack[++sp] = returnValue;
          break;
        }
        case I.LOAD: {
          const op_offset = code[ip++];
          const value = stack[fp + op_offset];
          stack[++sp] = value;
          break;
        }
        case I.JUMP_IF_ZERO: {
          const op_address = code[ip++];
          const value = stack[sp--];
          if (value === 0) {
            ip = op_address;
          }
          break;
        }
        case I.JUMP_IF_NOT_ZERO: {
          const op_address = code[ip++];
          const value = stack[sp--];
          if (value !== 0) {
            ip = op_address;
          }
          break;
        }
        default:
          throw new Error(`Unknown instruction: ${instruction}.`);
      }
    }
  }

  return {
    run,
  };
}

module.exports = { createVM };
