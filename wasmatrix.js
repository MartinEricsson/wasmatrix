// runtime, loads the wasm file

const VEC3_SIZE = 3 * 4;

const createMemoryBuffer = (pages = 1) => {
  const memory = new WebAssembly.Memory({ initial: pages });
  const view = new Int32Array(memory.buffer);
  const data = new Float32Array(memory.buffer);
  let ptr = 4; // pointer in bytes for wasm

  const createVec3 = (x = 0, y = 0, z = 0) => {
    const addr = ptr;
    let index = ptr / 4;

    data[index++] = x;
    data[index++] = y;
    data[index] = z;

    ptr += VEC3_SIZE;

    return addr;
  };

  const v3toString = v => {
    let addr = v / 4;
    return `Addr ${v} x: ${data[addr++]} y: ${data[addr++]} z: ${data[addr]}`;
  };

  const clone = v => {
    let addr = v / 4;
    return createVec3(data[addr++], data[addr++], data[addr]);
  };

  const inspect = v => {
    let addr = v / 4;
    return [data[addr++], data[addr++], data[addr]];
  };

  const grow = additionalPages => memory.grow(additionalPages);

  return { clone, memory, view, createVec3, v3toString, inspect, grow };
};

const buffer = createMemoryBuffer();
const importObject = {
  js: { mem: buffer.memory },
  console: {
    log: x => {
      console.log(x);
    }
  }
};

const mod = fetch("wasmatrix.wasm")
  .then(response => response.arrayBuffer())
  .then(bytes => WebAssembly.instantiate(bytes, importObject))
  .then(results => {
    const {
      instance: { exports: mod }
    } = results;
    return { mod, buffer };
  });

export { createMemoryBuffer, mod };
