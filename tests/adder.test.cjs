const test = require('node:test');
const assert = require('node:assert/strict');
const { calculate } = require('../adder.js');

function expected(a, b, mode) {
  const raw = mode === 0 ? a + b : a - b;
  const result = ((raw % 16) + 16) % 16;
  const carryOut = mode === 0 ? Number(a + b >= 16) : Number(a + ((b ^ 15) & 15) + 1 >= 16);
  const signedA = a >= 8 ? a - 16 : a;
  const signedB = b >= 8 ? b - 16 : b;
  const signedRaw = mode === 0 ? signedA + signedB : signedA - signedB;
  const overflow = Number(signedRaw < -8 || signedRaw > 7);
  return { result, carryOut, borrow: mode === 1 ? 1 - carryOut : null, overflow };
}

test('addition example: 5 + 3 = 8', () => {
  const out = calculate(5, 3, 0);
  assert.equal(out.result, 8);
  assert.equal(out.carryOut, 0);
  assert.equal(out.signedOverflow, 1);
});

test('subtraction example without borrow: 5 - 3 = 2', () => {
  const out = calculate(5, 3, 1);
  assert.equal(out.result, 2);
  assert.equal(out.carryOut, 1);
  assert.equal(out.borrow, 0);
});

test('subtraction example with borrow: 3 - 5 = -2 (1110)', () => {
  const out = calculate(3, 5, 1);
  assert.equal(out.result, 14);
  assert.equal(out.signedResult, -2);
  assert.equal(out.carryOut, 0);
  assert.equal(out.borrow, 1);
});

test('zero and full-width carry edge cases', () => {
  assert.deepEqual(
    (({ result, carryOut, zero }) => ({ result, carryOut, zero }))(calculate(15, 1, 0)),
    { result: 0, carryOut: 1, zero: 1 }
  );
  assert.equal(calculate(0, 0, 1).result, 0);
  assert.equal(calculate(0, 0, 1).borrow, 0);
});

test('all 512 input and mode combinations match arithmetic expectations', () => {
  for (let a = 0; a < 16; a += 1) {
    for (let b = 0; b < 16; b += 1) {
      for (let mode = 0; mode <= 1; mode += 1) {
        const actual = calculate(a, b, mode);
        const want = expected(a, b, mode);
        assert.equal(actual.result, want.result, `result mismatch for a=${a}, b=${b}, mode=${mode}`);
        assert.equal(actual.carryOut, want.carryOut, `carry mismatch for a=${a}, b=${b}, mode=${mode}`);
        assert.equal(actual.borrow, want.borrow, `borrow mismatch for a=${a}, b=${b}, mode=${mode}`);
        assert.equal(actual.signedOverflow, want.overflow, `overflow mismatch for a=${a}, b=${b}, mode=${mode}`);
        assert.equal(actual.trace.length, 4);
        assert.equal(actual.carryChain.length, 5);
        assert.equal(actual.trace[0].carryIn, mode);
      }
    }
  }
});

test('rejects invalid operands and mode', () => {
  assert.throws(() => calculate(16, 0, 0), RangeError);
  assert.throws(() => calculate(-1, 0, 0), RangeError);
  assert.throws(() => calculate(0, 0, 2), TypeError);
});
