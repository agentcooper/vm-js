# vm-js

Basic virtual machine in JavaScript for the custom bytecode.

```bash
# compute `factorial(10)`
~/js-vm % node index.js ./example-bytecode/factorial
3628800

# compute `fibonacci(25)`
~/js-vm % node index.js ./example-bytecode/fibonacci
75025
```

## Roadmap

- [ ] Rewrite VM code in C
- [ ] Create basic assembler
- [ ] Use JS/TS compatible AST to emit bytecode
