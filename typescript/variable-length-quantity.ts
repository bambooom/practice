/**
 * https://en.wikipedia.org/wiki/Variable-length_quantity
 * Implement variable length quantity encoding and decoding.
 *
 * In short, the goal of this encoding is to encode integer values in a way that would save bytes.
 * Only the first 7 bits of each byte is significant (right-justified; sort of like an ASCII byte).
 * So, if you have a 32-bit value, you have to unpack it into a series of 7-bit bytes.
 * Of course, you will have a variable number of bytes depending upon your integer.
 * To indicate which is the last byte of the series, you leave bit #7 clear.
 * In all of the preceding bytes, you set bit #7.
 *
 * So, if an integer is between 0-127, it can be represented as one byte.
 * Although VLQ can deal with numbers of arbitrary sizes, for this exercise
 * we will restrict ourselves to only numbers that fit in a 32-bit unsigned integer.
 */

/* Bit shifting wraps to -1 after (2**31)-1  (max 32 bit *signed* int)
 * From the ECMAScript standard (https://www.ecma-international.org/ecma-262/9.0/index.html#sec-left-shift-operator)
 * "... The result is a signed 32-bit integer."
 *
 * So n << 7 may overflow, and n >> 7 is wrong if n >= 2**31
 */
const MSB = 1 << 7; // 0b10000000 -> 1<<m === 2**m
const MASK = MSB ^ 0xff; // 0b01111111
const SHIFT_AMT = 7;
function shiftLeft(n: number, m: number): number {
  return n * 2 ** m; // n << m
}
function shiftRight(n: number, m: number): number {
  return Math.floor(n / 2 ** m); // n >> m
}
function encode(numbers: number[]): number[] {
  let result: number[] = [];
  numbers.forEach((n) => {
    const bytes: number[] = [];
    let tmp = n;
    let msb = 0;
    do {
      bytes.unshift((tmp & MASK) | msb);
      msb = MSB;
      tmp = shiftRight(tmp, SHIFT_AMT);
    } while (tmp > 0);
    result = result.concat(bytes);
  });
  return result;
}
function decode(bytes: number[]): number[] {
  if ((bytes[bytes.length - 1] & MSB) !== 0) {
    throw new Error('Incomplete sequence');
  }
  const accumulator: { nums: number[]; n: number } = { nums: [], n: 0 };
  const { nums } = bytes.reduce((acc, b) => {
    acc.n = shiftLeft(acc.n, SHIFT_AMT) + (b & MASK);
    if ((b & MSB) === 0) {
      acc.nums.push(acc.n);
      acc.n = 0;
    }
    return acc;
  }, accumulator);
  return nums;
}
export { encode, decode };

// ========= another solution =============

const BITS = 7;
export function encode2(bytes: number[]): number[] {
  return bytes.map(vlq).flat();
}
function vlq(byte: number): number[] {
  if (byte === 0) {
    return [0];
  }
  const code: number[] = [];
  while (byte > 0) {
    code.push(byte % (1 << BITS));
    byte = Math.floor(byte / (1 << BITS));
  }
  return code.map((v, i) => (i > 0 ? v + (1 << BITS) : v)).reverse();
}
export function decode2(bytes: number[]): number[] {
  const groups: number[][] = [];
  let group: number[] = [];
  for (const byte of bytes) {
    group.push(byte);
    if (byte < 1 << BITS) {
      groups.push(group);
      group = [];
    }
  }
  if (group.length > 0) {
    throw Error('Incomplete sequence');
  }
  return groups.map(vlq_decode);
}
function vlq_decode(bytes: number[]): number {
  return bytes
    .reverse()
    .reduce(
      (final, b, i) => (i ? final + (b - (1 << BITS)) * (1 << BITS) ** i : b),
      0,
    );
}
