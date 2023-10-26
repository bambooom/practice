// https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c
// Given 3 positives numbers a, b and c. Return the minimum flips required in some bits of a and b to make ( a OR b == c ). (bitwise OR operation).
// Flip operation consists of change any single bit 1 to 0 or change the bit 0 to 1 in their binary representation.
// #bit-manipulation

// https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c/solutions/3609691/2-simple-solutions-with-bit-manipulation-and-strings/?envType=study-plan-v2&envId=leetcode-75
// Approach: Have a number with only one bit 1, and move the bit to see if flipping is required by checking its AND result with all the numbers
function minFlips(a: number, b: number, c: number): number {
  const limit = Math.max(a, b, c);
  let check = 1;
  let result = 0;
  while (check <= limit) {
    if (check & c) {
      if (!(check & a) && !(check & b)) {
        result++;
      }
    } else {
      if (check & a) {
        result++;
      }
      if (check & b) {
        result++;
      }
    }
    check *= 2;
  }
  return result;
}

// toString: Transform numbers to strings and check if flipping is required through iteration
function minFlips2(a: number, b: number, c: number): number {
  const aStr = a.toString(2).split('').reverse();
  const bStr = b.toString(2).split('').reverse();
  const target = c.toString(2).split('').reverse();

  let result = 0;
  const maxLen = Math.max(aStr.length, bStr.length, target.length);
  for (let i = 0; i < maxLen; i++) {
    if (!target[i] || target[i] === '0') {
      if (aStr[i] === '1') {
        result++;
      }
      if (bStr[i] === '1') {
        result++;
      }
    } else {
      if ((!aStr[i] || aStr[i] === '0') && (!bStr[i] || bStr[i] === '0')) {
        result++;
      }
    }
  }
  return result;
}

// https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c/solutions/3606696/simple-javascript-typescript-check/?envType=study-plan-v2&envId=leetcode-75
function minFlips3(a: number, b: number, c: number): number {
  const A = (a >>> 0).toString(2).split('');
  const B = (b >>> 0).toString(2).split('');
  const C = (c >>> 0).toString(2).split('');
  let flips = 0;
  while (A.length || B.length) {
    const charA = A.length ? A.pop() : '0';
    const charB = B.length ? B.pop() : '0';
    const charC = C.length ? C.pop() : '0';

    if (charC === '0') {
      if (charA === '1') flips++;
      if (charB === '1') flips++;
    } else {
      if (charA === '0' && charB === '0') flips++;
    }
  }

  for (let i = 0; i < C.length; i++) {
    if (C[i] === '1') flips++;
  }

  return flips;
}
