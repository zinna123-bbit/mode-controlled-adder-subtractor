/* Pure logic for a 4-bit mode-controlled binary adder-subtractor. */
(function (root) {
  'use strict';

  function calculate(a, b, mode, width = 4) {
    if (!Number.isInteger(width) || width < 1 || width > 16) {
      throw new RangeError('Width must be an integer from 1 to 16.');
    }
    const limit = 1 << width;
    if (!Number.isInteger(a) || !Number.isInteger(b) || a < 0 || b < 0 || a >= limit || b >= limit) {
      throw new RangeError(`Operands must be unsigned ${width}-bit integers.`);
    }
    if (mode !== 0 && mode !== 1) throw new TypeError('Mode must be 0 (add) or 1 (subtract).');

    const mask = limit - 1;
    let carry = mode;
    const initialCarry = carry;
    const trace = [];
    const carryIntoMsb = width > 1 ? null : undefined;
    let carryIntoMostSignificantBit = width === 1 ? initialCarry : null;
    let result = 0;

    for (let bit = 0; bit < width; bit += 1) {
      const aBit = (a >> bit) & 1;
      const bBit = (b >> bit) & 1;
      const conditionedB = bBit ^ mode;
      const carryIn = carry;
      const partial = aBit ^ conditionedB;
      const sum = partial ^ carryIn;
      const carryOut = (aBit & conditionedB) | (carryIn & partial);

      if (bit === width - 1) carryIntoMostSignificantBit = carryIn;
      result |= sum << bit;
      trace.push({ bit, aBit, bBit, conditionedB, carryIn, sum, carryOut });
      carry = carryOut;
    }

    const carryOut = carry;
    const signBit = (result >> (width - 1)) & 1;
    const signedOverflow = width > 1 ? (carryIntoMostSignificantBit ^ carryOut) : 0;
    const signedResult = signBit ? result - limit : result;
    const borrow = mode === 1 ? (carryOut ^ 1) : null;

    return {
      a, b, mode, width, result: result & mask, carryOut,
      borrow, signedOverflow, zero: result === 0 ? 1 : 0,
      sign: signBit, signedResult, initialCarry, carryIntoMostSignificantBit,
      trace, carryChain: [initialCarry, ...trace.map((row) => row.carryOut)]
    };
  }

  const api = { calculate };
  root.AdderSubtractorLogic = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
