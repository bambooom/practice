// https://leetcode.com/problems/count-the-number-of-ideal-arrays/
// You are given two integers n and maxValue, which are used to describe an ideal array.

// A 0-indexed integer array arr of length n is considered ideal if the following conditions hold:

// Every arr[i] is a value from 1 to maxValue, for 0 <= i < n.
// Every arr[i] is divisible by arr[i - 1], for 0 < i < n.
// Return the number of distinct ideal arrays of length n. Since the answer may be very large, return it modulo 109 + 7.

// Example 1:
// Input: n = 2, maxValue = 5
// Output: 10
// Explanation: The following are the possible ideal arrays:
// - Arrays starting with the value 1 (5 arrays): [1,1], [1,2], [1,3], [1,4], [1,5]
// - Arrays starting with the value 2 (2 arrays): [2,2], [2,4]
// - Arrays starting with the value 3 (1 array): [3,3]
// - Arrays starting with the value 4 (1 array): [4,4]
// - Arrays starting with the value 5 (1 array): [5,5]
// There are a total of 5 + 2 + 1 + 1 + 1 = 10 distinct ideal arrays.

// Example 2:
// Input: n = 5, maxValue = 3
// Output: 11
// Explanation: The following are the possible ideal arrays:
// - Arrays starting with the value 1 (9 arrays):
//    - With no other distinct values (1 array): [1,1,1,1,1]
//    - With 2nd distinct value 2 (4 arrays): [1,1,1,1,2], [1,1,1,2,2], [1,1,2,2,2], [1,2,2,2,2]
//    - With 2nd distinct value 3 (4 arrays): [1,1,1,1,3], [1,1,1,3,3], [1,1,3,3,3], [1,3,3,3,3]
// - Arrays starting with the value 2 (1 array): [2,2,2,2,2]
// - Arrays starting with the value 3 (1 array): [3,3,3,3,3]
// There are a total of 9 + 1 + 1 = 11 distinct ideal arrays.

// https://leetcode.com/problems/count-the-number-of-ideal-arrays/solutions/6675648/making-ideal-arrays-with-math-magic-python3-c-js-go/?envType=daily-question&envId=2025-04-22
// Each element divides the next one.
// The first element can be any value from 1 to maxValue.
// We can build ideal arrays by starting from any number x and then multiplying it by some integer m (≥ 2) as long as the result is ≤ maxValue.
// We precompute all the possible chains and for each chain of length k+1, we compute how many ways it can be placed in an array of length n using combinations (comb(n - 1, k)), since we can choose k positions to place the changes (multiplicative steps).
function idealArrays(n: number, maxValue: number): number {
  const MODULO = BigInt(1e9 + 7);
  let ans = BigInt(maxValue); // accounting for arrays of length 1 (just [x] repeated n times).

  let freq: Record<number, bigint> = {};
  for (let x = 1; x <= maxValue; x++) {
    freq[x] = BigInt(1);
  }

  // calculates the number of ways to choose k positions from n-1 positions using the formula n! / (k! * (n-k)!).
  const combination = (n: number, k: number): bigint => {
    let res = BigInt(1);
    for (let i = 0; i < k; i++) {
      res = (res * BigInt(n - i)) / BigInt(i + 1);
    }
    return res;
  };

  // For each step k from 1 to n - 1 (building arrays of length k + 1):
  for (let k = 1; k < n; k++) {
    const newFreq: Record<number, bigint> = {};

    for (const x in freq) {
      const intX = parseInt(x);
      for (let m = 2; m * intX <= maxValue; m++) {
        const next = m * intX;
        // Add freq[x] to the count of m*x in the next frequency dictionary
        newFreq[next] = (newFreq[next] || BigInt(0)) + freq[intX];
        // For each new extension, increase answer using combination
        ans = (ans + combination(n - 1, k) * freq[intX]) % MODULO;
      }
    }

    freq = newFreq;
  }

  return Number(ans);
}
// changes to use bigint to avoid overflow
