import { setExport } from "./wasm_helpers.js";
import { load, loadFromMemorySection, store } from "./vec3_helpers.js";

/**
 * Dot product
 */
const dot = setExport(
  `(func $dot 
    (param $a i32) (param $b i32)
        (result f32) 
        ${loadFromMemorySection}
        get_local $ax
        get_local $bx
        f32.mul
        get_local $ay
        get_local $by
        f32.mul
        get_local $az
        get_local $bz
        f32.mul
        f32.add
        f32.add)
  `,
  "dot"
);

/**
 * Addition of two vectors
 */
const add = setExport(
  `(func $add
    (param $a i32) (param $b i32) (param $ans i32)
    (result i32)
    ${loadFromMemorySection}
    (get_local $ax)
    (get_local $bx)
    (f32.add)
    (get_local $ay)
    (get_local $by)
    (f32.add)
    (get_local $az)
    (get_local $bz)
    (f32.add)
    (get_local $ans)
    (call $store_vec)
      )`,
  "add"
);
/**
 * Subtraction of two vectors
 */
const sub = setExport(
  `${store}
   ${load}
   (func $sub
    (param $a i32) (param $b i32) (param $ans i32)
    (result i32)
    ${loadFromMemorySection}
    (get_local $ax)
    (get_local $bx)
    (f32.sub)
    (get_local $ay)
    (get_local $by)
    (f32.sub)
    (get_local $az)
    (get_local $bz)
    (f32.sub)
    (get_local $ans)
    (call $store_vec)
    )`,
  "sub"
);

/**
 * Uniform scaling
 */
const scale = setExport(
  `(func $scale
        (param $a i32) (param $t f32) (param $ans i32)
        (result i32)
        (local $ax f32)
        (local $ay f32)
        (local $az f32)
        (set_local $ax
            (call $load_value
                (i32.const 0)
                (get_local $a)
            )
        )
        (set_local $ay
            (call $load_value
                (i32.const 4)
                (get_local $a)
            )
        )
        (set_local $az
            (call $load_value
                (i32.const 8)
                (get_local $a)
            )
        )
        (get_local $ax)
        (get_local $t)
        (f32.mul)
        (get_local $ay)
        (get_local $t)
        (f32.mul)
        (get_local $az)
        (get_local $t)
        (f32.mul)
        (get_local $ans)
        (call $store_vec)
    )`,
  "scale"
);

/**
 * Cross product
 */
const cross = setExport(
  `(func $cross
    (param $a i32) (param $b i32) (param $ans i32)
    (result i32)
    ${loadFromMemorySection}
    (get_local $ay)
    (get_local $bz)
    (f32.mul)
    (get_local $az)
    (get_local $by)
    (f32.mul)
    (f32.sub)
    (get_local $az)
    (get_local $bx)
    (f32.mul)
    (get_local $ax)
    (get_local $bz)
    (f32.mul)
    (f32.sub)
    (get_local $ax)
    (get_local $by)
    (f32.mul)
    (get_local $ay)
    (get_local $bx)
    (f32.mul)
    (f32.sub)
    (get_local $ans)
    (call $store_vec)
)`,
  "cross"
);

/**
 * Length of a vector
 */
const length = setExport(
  `
(func $length
    (param $a i32)
    (result f32)
    (get_local $a)
    (get_local $a)
    (call $dot)
    (f32.sqrt)
)
`,
  "length"
);

/**
 * Normalize a vector
 */
const normalize = setExport(
  `(func $normalize
        (param $a i32)
        (param $b i32)
        (result i32)
        (get_local $a)
        (f32.const 1)
        (get_local $a)
        (call $length)
        (f32.div)
        (get_local $b)
        (call $scale)
    )`,
  "normalize"
);

/**
 * Distance between to vectors.. if you pretend that they are points!
 */
const distance = setExport(
  `(func $distance
        (param $a i32)
        (param $b i32)
        (result f32)
        (local $cx f32)
        (local $cy f32)
        (local $cz f32)
        ${loadFromMemorySection}
        (get_local $ax)
        (get_local $bx)
        (f32.sub)
        (tee_local $cx)
        (get_local $cx)
        (f32.mul)
        (get_local $ay)
        (get_local $by)
        (f32.sub)
        (tee_local $cy)
        (get_local $cy)
        (f32.mul)
        (get_local $az)
        (get_local $bz)
        (f32.sub)
        (tee_local $cz)
        (get_local $cz)
        (f32.mul)
        (f32.add)
        (f32.add)
        (f32.sqrt)
    )`,
  "distance"
);

/**
 * Linear interpolation between two vectors
 */
const lerp = setExport(
  `(func $lerp
    (param $a i32)
    (param $b i32)
    (param $t f32)
    (param $c i32)
    (result i32)
    (local $s f32)
    ${loadFromMemorySection}
    (f32.const 1)
    (get_local $t)
    (f32.sub)
    (tee_local $s)
    (get_local $bx)
    (f32.mul)
    (get_local $ax)
    (get_local $t)
    (f32.mul)
    (f32.add)
    (get_local $t)
    (get_local $ay)
    (f32.mul)
    (get_local $s)
    (get_local $by)
    (f32.mul)
    (f32.add)
    (get_local $t)
    (get_local $az)
    (f32.mul)
    (get_local $s)
    (get_local $bz)
    (f32.mul)
    (f32.add)
    (get_local $c)
    (call $store_vec)
)`,
  "lerp"
);

/**
 * Inverse a vector
 */
const inverse = setExport(
  `
(func $inverse
    (param $a i32)
    (param $b i32)
    (result i32)
    (local $ax f32)
    (local $ay f32)
    (local $az f32)
    (set_local $ax
        (call $load_value
            (i32.const 0)
            (get_local $a)
        )
    )
    (set_local $ay
        (call $load_value
            (i32.const 4)
            (get_local $a)
        )
    )
    (set_local $az
        (call $load_value
            (i32.const 8)
            (get_local $a)
        )
    )
    (f32.const 1)
    (get_local $ax)
    (f32.div)
    (f32.const 1)
    (get_local $ay)
    (f32.div)
    (f32.const 1)
    (get_local $az)
    (f32.div)
    (get_local $b)
    (call $store_vec)
)
`,
  "inverse"
);

/**
 * Divide a elements in the vector
 */
const divide = setExport(
  `
    (func $divide
        (param $a i32) (param $b i32) (param $ans i32)
        (result i32)
        ${loadFromMemorySection}
        (get_local $ax)
        (get_local $bx)
        (f32.div)
        (get_local $ay)
        (get_local $by)
        (f32.div)
        (get_local $az)
        (get_local $bz)
        (f32.div)
        (get_local $ans)
        (call $store_vec)
    )
`,
  "divide"
);

export {
  add,
  dot,
  sub,
  scale,
  cross,
  length,
  normalize,
  distance,
  lerp,
  inverse,
  divide
};
