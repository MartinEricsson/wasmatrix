// compile script for the library

import { compiledSrc, createMemoryBuffer } from "./src/wasm_helpers.js";
import {
  dot,
  sub,
  add,
  scale,
  cross,
  length,
  normalize,
  distance,
  lerp,
  inverse,
  divide
} from "./src/vec3.js";
import { cos, sin } from "./src/math.js";

const srcNow = `${dot} ${sub} ${add} ${scale} ${cross} ${length} ${normalize} ${distance} ${lerp} ${inverse} ${divide} ${cos} ${sin}`;

const buffer = createMemoryBuffer();

compiledSrc(srcNow, {
  js: { mem: buffer.memory },
  console: {
    log: x => {
      console.log(x);
    }
  }
})
  .then(mod => {
    console.log(`
    🛠️  All done
    `);
    return true;
  })
  .catch(e => {
    console.error(e);
  });
