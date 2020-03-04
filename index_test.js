// test implementation

import { mod } from "./wasmatrix.js";

// add vec3
const testAdd = (add, buffer) => {
  const a = buffer.createVec3(1, 2, 3);
  const b = buffer.createVec3(4, 5, 6);
  const c = buffer.createVec3();
  add(a, b, c);
  console.groupCollapsed("vec3 add");
  console.log(buffer.v3toString(a));
  console.log(buffer.v3toString(b));
  console.log(buffer.v3toString(c));
  console.groupEnd();
  const ans = buffer.inspect(c);
  console.assert(ans[0] == 5 && ans[1] == 7 && ans[2] == 9);
};
// sub vec3
const testSub = (sub, buffer) => {
  const a = buffer.createVec3(1, 2, 3);
  const b = buffer.createVec3(4, 5, 6);
  const c = buffer.createVec3();
  sub(a, b, c);
  console.groupCollapsed("vec3 sub");
  console.log(buffer.v3toString(a));
  console.log(buffer.v3toString(b));
  console.log(buffer.v3toString(c));
  console.groupEnd();
  const ans = buffer.inspect(c);
  console.assert(ans[0] == -3 && ans[1] == -3 && ans[2] == -3);
};
// dot vec3
const testDot = (dot, buffer) => {
  const a = buffer.createVec3(1, 2, 3);
  const b = buffer.createVec3(4, 5, 6);
  const c = dot(a, b);
  console.groupCollapsed("vec3 dot");
  console.log(buffer.v3toString(a));
  console.log(buffer.v3toString(b));
  console.log(c);
  console.groupEnd();
  console.assert(c == 32);
};
// scale vec3
const testScale = (scale, buffer) => {
  const a = buffer.createVec3(1, 2, 3);
  const b = buffer.createVec3(4, 5, 6);
  const c = 10;
  scale(a, c, b);
  console.groupCollapsed("vec3 scale");
  console.log(buffer.v3toString(a));
  console.log(buffer.v3toString(b));
  console.log(c);
  console.groupEnd();
  const ans = buffer.inspect(b);
  console.assert(ans[0] == 10 && ans[1] == 20 && ans[2] == 30);
};
// cross vec3
const testCross = (cross, buffer) => {
  const a = buffer.createVec3(1, 2, 3);
  const b = buffer.createVec3(4, 5, 6);
  const c = buffer.createVec3();
  cross(a, b, c);
  console.groupCollapsed("vec3 cross");
  console.log(buffer.v3toString(a));
  console.log(buffer.v3toString(b));
  console.log(buffer.v3toString(c));
  console.groupEnd();
  const ans = buffer.inspect(c);
  console.assert(ans[0] == -3 && ans[1] == 6 && ans[2] == -3);
};

// length vec3
const testLength = (length, buffer) => {
  const a = buffer.createVec3(1, 1, 1);
  const b = buffer.createVec3(2, 2, 1);
  const al = length(a);
  const bl = length(b);
  console.groupCollapsed("vec3 length");
  console.log(al);
  console.log(bl);
  console.groupEnd();
  console.assert(al == 1.7320507764816284);
  console.assert(bl == 3);
};

const testClone = (clone, buffer) => {
  const a = buffer.createVec3(2, 4, 6);
  const b = clone(a);
  console.groupCollapsed("vec3 clone");
  console.log(buffer.v3toString(a));
  console.log(buffer.v3toString(b));
  console.groupEnd();
  const ans = buffer.inspect(b);
  console.assert(ans[0] == 2 && ans[1] == 4 && ans[2] == 6);
};

const testNormalize = (normalize, buffer) => {
  const a = buffer.createVec3(2, 4, 6);
  const b = buffer.createVec3();
  normalize(a, b);
  console.groupCollapsed("vec3 normalize");
  console.log(buffer.v3toString(a));
  console.log(buffer.v3toString(b));
  console.groupEnd();
  const ans = buffer.inspect(b);
  const eps = ans[0] * ans[0] + ans[1] * ans[1] + ans[2] * ans[2];
  console.assert(Math.abs(1 - eps) < 0.0000001);
};

const testDistance = (distance, buffer) => {
  const a = buffer.createVec3(0, 0, 0);
  const b = buffer.createVec3(2, 2, 1);
  const c = buffer.createVec3(2, 1, 1);

  const d1 = distance(a, b);
  const d2 = distance(b, c);
  const d3 = distance(c, b);
  const d4 = distance(c, a);

  console.groupCollapsed("vec3 distance");
  console.log(d1);
  console.log(d2);
  console.log(d3);
  console.log(d4);
  console.assert(d1 == 3);
  console.assert(d2 == 1);
  console.assert(d2 == d3);
  console.assert(d4 == 2.4494898319244385);
  console.groupEnd();
};

const testLerp = (lerp, buffer) => {
  const a = buffer.createVec3(3, 5, 7);
  const b = buffer.createVec3(3, 2, 1);
  const c = buffer.createVec3();
  const t = 0.5;
  lerp(a, b, t, c);
  console.groupCollapsed("vec3 lerp");
  console.log(buffer.v3toString(a));
  console.log(buffer.v3toString(b));
  console.log(buffer.v3toString(c));
  console.log(t);
  const ans = buffer.inspect(c);
  console.assert(ans[0] == 3 && ans[1] == 3.5 && ans[2] == 4);
  console.groupEnd();
};

const testInvert = (inverse, buffer) => {
  const a = buffer.createVec3(3, 2, 1);
  const b = buffer.createVec3();
  inverse(a, b);
  console.groupCollapsed("vec3 inverse");
  console.log(buffer.v3toString(a));
  console.log(buffer.v3toString(b));
  const ans = buffer.inspect(b);
  console.assert(ans[0] == 0.3333333432674408 && ans[1] == 0.5 && ans[2] == 1);
  console.groupEnd();
};

const testDivide = (divide, buffer) => {
  const a = buffer.createVec3(3, 5, 7);
  const b = buffer.createVec3(3, 2, 1);
  const c = buffer.createVec3();
  const d = buffer.createVec3();
  divide(a, b, c);
  divide(b, a, d);
  console.groupCollapsed("vec3 divide");
  console.log(buffer.v3toString(a));
  console.log(buffer.v3toString(b));
  console.log(buffer.v3toString(c));
  console.log(buffer.v3toString(d));
  const ansAB = buffer.inspect(c);
  const ansBA = buffer.inspect(d);
  console.assert(
    ansAB[0] == 1 &&
      ansAB[1] == 2.5 &&
      ansAB[2] == 7 &&
      ansBA[0] == 1 &&
      ansBA[1] == 0.4000000059604645 &&
      ansBA[2] == 0.1428571492433548
  );
  console.groupEnd();
};

const testCos = cos => {
  const EPS = 0.01;
  console.groupCollapsed("cos approximation");
  for (let angle = -2 * Math.PI; angle <= 2 * Math.PI; angle += 0.1) {
    console.log(Math.abs(Math.cos(angle) - cos(angle)));
    console.assert(Math.abs(Math.cos(angle) - cos(angle)) < EPS);
  }
  console.groupEnd();
};

const testSin = sin => {
  const EPS = 0.01;

  console.groupCollapsed("sin approximation");
  let i = 0;
  for (let angle = -2 * Math.PI; angle <= 2 * Math.PI; angle += 0.1) {
    console.log(Math.abs(Math.sin(angle) - sin(angle)));
    console.assert(Math.abs(Math.sin(angle) - sin(angle)) < EPS);
  }
  console.groupEnd();
};

mod.then(({ mod, buffer }) => {
  testAdd(mod.add, buffer);
  testSub(mod.sub, buffer);
  testDot(mod.dot, buffer);
  testScale(mod.scale, buffer);
  testCross(mod.cross, buffer);
  testLength(mod.length, buffer);
  testClone(buffer.clone, buffer);
  testNormalize(mod.normalize, buffer);
  testDistance(mod.distance, buffer);
  testLerp(mod.lerp, buffer);
  testInvert(mod.inverse, buffer);
  testDivide(mod.divide, buffer);
  testCos(mod.cos);
  testSin(mod.sin);
});
