const debugPrint = `(import "console" "log" (func $log (param f32)))`;
const wrapModule = src => `(module ${debugPrint} ${src})`;
const setExport = (src, name) => `${src} (export "${name}" (func $${name}))`;
const importMemory = (src, namespace, name, size = 1) =>
  `(import "${namespace}" "${name}" (memory ${size}))${src}`;
const wabt = require("wabt")();
const fs = require("fs");

const compileWabt = (src, name = "tmp.wast") => {
  return new Promise((resolve, reject) => {
    const script = wabt.parseWat(name, src);
    script.resolveNames();
    script.validate();
    const binaryOutput = script.toBinary({ log: true });
    let { buffer: binaryBuffer = null } = binaryOutput;
    fs.writeFile("./wasmatrix.wasm", binaryBuffer, err => {
      if (err) {
        console.log(err);
        reject(null);
      }
      console.log("The file was saved!");
    });
    resolve(binaryBuffer);
  });
};

const compiledSrc = (src, imports) => {
  console.log(src);
  return new Promise((resolve, reject) => {
    compileWabt(wrapModule(importMemory(src, "js", "mem")))
      .then(bytes => {
        return WebAssembly.instantiate(bytes, imports);
      })
      .then(res => {
        const {
          instance: { exports: mod }
        } = res;
        resolve(mod);
      })
      .catch(e => reject(e));
  });
};

const BYTE_SIZE = 4;
const VEC3_SIZE = 3 * BYTE_SIZE;

const createMemoryBuffer = (pages = 1) => {
  const memory = new WebAssembly.Memory({ initial: pages });
  const view = new Int32Array(memory.buffer);
  const data = new Float32Array(memory.buffer);
  let ptr = 4; // pointer in bytes for wasm

  const createVec3 = (x = 0, y = 0, z = 0) => {
    const addr = ptr;
    let index = ptr / BYTE_SIZE;

    data[index++] = x;
    data[index++] = y;
    data[index] = z;

    ptr += VEC3_SIZE;

    return addr;
  };

  const log = v => {
    let addr = v / BYTE_SIZE;
    console.log(`Addr ${v}`);
    console.log(`x: ${data[addr++]}`);
    console.log(`y: ${data[addr++]}`);
    console.log(`z: ${data[addr]}`);

    return true;
  };

  return { memory, view, createVec3, log };
};

export { compiledSrc, setExport, wrapModule, createMemoryBuffer };
