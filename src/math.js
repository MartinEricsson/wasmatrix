import { setExport } from "./wasm_helpers.js";

/**
 * Cosinus approximation
 */
const cos = setExport(
  `
(func $cos
  (param $angle f32)
  (result f32)
  (local $x f32)
  (f32.const 0.15915494309189535)
  (get_local $angle)
  (f32.mul)
  (tee_local $x)
  (f32.const 0.25)
  (f32.sub)
  (get_local $x)
  (f32.const 0.25)
  (f32.add)
  (f32.floor)
  (f32.sub)
  (tee_local $x)
  (f32.abs)
  (f32.const 0.5)
  (f32.sub)
  (f32.const 16)
  (f32.mul)
  (get_local $x)
  (f32.mul)
  (tee_local $x)
  (f32.abs)
  (f32.const 1)
  (f32.sub)
  (get_local $x)
  (f32.mul)
  (f32.const 0.225)
  (f32.mul)
  (get_local $x)
  (f32.add)
)
`,
  "cos"
);

/**
 * Sinus approximation
 */
const sin = setExport(
  `
(func $sin
  (param $angle f32)
  (result f32)
  (f32.const 1.5707963267948966)
  (get_local $angle)
  (f32.sub)
  (call $cos)
)
`,
  "sin"
);

export { cos, sin };
