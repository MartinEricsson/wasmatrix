const store = `(func $store_vec 
  (param $x f32) (param $y f32) (param $z f32) (param $addr i32) 
  (result i32)
  (get_local $addr)
  (get_local $x)
  (f32.store)
  (i32.add
      (get_local $addr)
      (i32.const 4)
  )
  (get_local $y)
  (f32.store)
  (i32.add
      (get_local $addr)
      (i32.const 8)
  )
  (get_local $z)
  (f32.store)
  (i32.const 0)
)`;

const load = `(func $load_value (param $addr i32) (param $offset i32)
(result f32)
    (f32.load
        (i32.add 
            (get_local $offset)
            (get_local $addr)
        )
    )
)`;

/**
 *  Loads the vectors a and b into {ax, ay, az} and {bx, by, bz}
 */
const loadFromMemorySection = `(local $ax f32)
(local $ay f32)
(local $az f32)
(local $bx f32)
(local $by f32)
(local $bz f32)
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
(set_local $bx
    (call $load_value
        (i32.const 0)
        (get_local $b)
    )
)
(set_local $by
    (call $load_value
        (i32.const 4)
        (get_local $b)
    )
)
(set_local $bz
    (call $load_value
        (i32.const 8)
        (get_local $b)
    )
)`;

export { store, load, loadFromMemorySection };
