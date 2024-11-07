// https://leetcode.com/problems/largest-combination-with-bitwise-and-greater-than-zero/
// The bitwise AND of an array nums is the bitwise AND of all integers in nums.

// For example, for nums = [1, 5, 3], the bitwise AND is equal to 1 & 5 & 3 = 1.
// Also, for nums = [7], the bitwise AND is 7.
// You are given an array of positive integers candidates. Evaluate the bitwise AND of every combination of numbers of candidates. Each number in candidates may only be used once in each combination.

// Return the size of the largest combination of candidates with a bitwise AND greater than 0.

// Example 1:

// Input: candidates = [16,17,71,62,12,24,14]
// Output: 4
// Explanation: The combination [16,17,62,24] has a bitwise AND of 16 & 17 & 62 & 24 = 16 > 0.
// The size of the combination is 4.
// It can be shown that no combination with a size greater than 4 has a bitwise AND greater than 0.
// Note that more than one combination may have the largest size.
// For example, the combination [62,12,24,14] has a bitwise AND of 62 & 12 & 24 & 14 = 8 > 0.
// Example 2:

// Input: candidates = [8,8]
// Output: 2
// Explanation: The largest combination [8,8] has a bitwise AND of 8 & 8 = 8 > 0.
// The size of the combination is 2, so we return 2.

// https://leetcode.com/problems/largest-combination-with-bitwise-and-greater-than-zero/solutions/6017206/beats-100-most-common-array-interview-problems/
function largestCombination(candidates: number[]): number {
  // create an array to store count of 1's each bit position (32 bits for integers)
  const ans: number[] = new Array(32).fill(0);

  const find = (n: number, ans: number[]): void => {
    // start from rightmost bit
    let j = 31;

    while (n > 0) {
      // get rightmost bit using bitwise AND with 1
      const a = n & 1;

      // add the bit count to corresponding position in ans array
      ans[j] += a;

      // right shift n by 1 to process next bit
      n >>= 1;

      j--; // move right to left
    }
  };

  for (const x of candidates) {
    // coun tthe number of 1's at each bit position for current number
    find(x, ans);
  }

  // find max count of 1's across all bit position
  let res = 0;
  for (let i = 0; i < 32; i++) {
    res = Math.max(res, ans[i]);
  }

  return res;
}

// https://leetcode.com/problems/largest-combination-with-bitwise-and-greater-than-zero/solutions/6017425/100-time-o-n-space-o-1/
// most freq bit
function largestCombination2(candidates: number[]): number {
  const MAX_BITS = 24; // 1 + Math.floor(Math.log2(1e7));

  const freqs = new Array(MAX_BITS + 1).fill(0);
  for (let num of candidates) {
    for (let i = 0; num; num >>= 1) {
      freqs[i++] += num & 1;
    }
  }

  return Math.max(...freqs);
}
// max bit count
function largestCombination3(candidates: number[]): number {
  const MAX_BITS = 24; // 1 + Math.floor(Math.log2(1e7));
  let max = 0;

  for (let i = 0; i <= MAX_BITS; ++i) {
    let count = 0;
    for (const num of candidates) {
      count += 1 & (num >> i);
    }
    max = Math.max(max, count);
  }

  return max;
}
