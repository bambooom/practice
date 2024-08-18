// https://leetcode.com/problems/ugly-number-ii/
// An ugly number is a positive integer whose prime factors are limited to 2, 3, and 5.
// Given an integer n, return the nth ugly number.

// #hash-table #dynamic-programming #heap

function nthUglyNumber(n: number): number {
  if (!n) {
    return 0;
  }

  // General idea is to build up an array with ugly numbers till we reach n-1
  // So we will iterate multiples of 2,3,5 and record them.
  // But, if just store 2,3,5 - 4,6,10 - 6,9,15 etc we'd be going out of order
  // So we need to increase the indeces for 2,3,5 more wisely.

  let i2 = 0,
    i3 = 0,
    i5 = 0; // the 2,3,5 indeces
  const out = [1]; // we will fill this with the ugly multiples

  while (!out[n - 1]) {
    const c2 = out[i2] * 2;
    const c3 = out[i3] * 3;
    const c5 = out[i5] * 5;
    // In c2,c3,c5 we now have 3 candidates for the next number. Pick the lowest one, to record in order
    // In the first round that will be 2
    const next = Math.min(c2, c3, c5);
    out.push(next);

    if (next === c2) {
      // now the 2 index will increase, and next round, c2 will be four, so c3=3 will be lowest
      i2++;
    }
    if (next === c3) {
      i3++;
    }
    if (next === c5) {
      i5++;
    }
  }

  return out[n - 1];
}

// https://leetcode.com/problems/ugly-number-ii/solutions/4349536/typescript-3-pointers-clean-and-fast-code-54-ms-beats-100/
function nthUglyNumber2(n: number): number {
  const ugly = new Array(n);
  ugly[0] = 1;
  let p2 = 0,
    p3 = 0,
    p5 = 0;
  for (let i = 1; i < n; i++) {
    const next = Math.min(ugly[p2] * 2, ugly[p3] * 3, ugly[p5] * 5);
    ugly[i] = next;
    if (next % 2 === 0) p2++;
    if (next % 3 === 0) p3++;
    if (next % 5 === 0) p5++;
  }
  return ugly[n - 1];
}
