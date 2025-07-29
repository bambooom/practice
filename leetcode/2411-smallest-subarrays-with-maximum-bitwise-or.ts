// https://leetcode.com/problems/smallest-subarrays-with-maximum-bitwise-or
// You are given a 0-indexed array nums of length n, consisting of non-negative integers. For each index i from 0 to n - 1, you must determine the size of the minimum sized non-empty subarray of nums starting at i (inclusive) that has the maximum possible bitwise OR.
// In other words, let Bij be the bitwise OR of the subarray nums[i...j]. You need to find the smallest subarray starting at i, such that bitwise OR of this subarray is equal to max(Bik) where i <= k <= n - 1.
// The bitwise OR of an array is the bitwise OR of all the numbers in it.
// Return an integer array answer of size n where answer[i] is the length of the minimum sized subarray starting at i with maximum bitwise OR.
// A subarray is a contiguous non-empty sequence of elements within an array.

// Example 1:
// Input: nums = [1,0,2,1,3]
// Output: [3,3,2,2,1]
// Explanation:
// The maximum possible bitwise OR starting at any index is 3.
// - Starting at index 0, the shortest subarray that yields it is [1,0,2].
// - Starting at index 1, the shortest subarray that yields the maximum bitwise OR is [0,2,1].
// - Starting at index 2, the shortest subarray that yields the maximum bitwise OR is [2,1].
// - Starting at index 3, the shortest subarray that yields the maximum bitwise OR is [1,3].
// - Starting at index 4, the shortest subarray that yields the maximum bitwise OR is [3].
// Therefore, we return [3,3,2,2,1].

// Example 2:
// Input: nums = [1,2]
// Output: [2,1]
// Explanation:
// Starting at index 0, the shortest subarray that yields the maximum bitwise OR is of length 2.
// Starting at index 1, the shortest subarray that yields the maximum bitwise OR is of length 1.
// Therefore, we return [2,1].

// https://leetcode.com/problems/smallest-subarrays-with-maximum-bitwise-or/solutions/7017720/ultimate-visual-analogy-smallest-subarrays-with-maximum-bitwise-or-beats-100/?envType=daily-question&envId=2025-07-29
function smallestSubarrays(nums: number[]): number[] {
  const len = nums.length;
  // keep track of the last seen index for each bit (0-29)
  const lastSeen: number[] = new Array(30).fill(0);
  // Initialize an array to store the result, where each element represents the length of the smallest subarray
  // starting at the corresponding index in `nums` that has the maximum possible bitwise OR
  const res: number[] = new Array(len).fill(1);

  // Iterate over the input array from right to left
  for (let i = len - 1; i >= 0; i--) {
    // Iterate over each bit (0-29)
    for (let bit = 0; bit < 30; bit++) {
      // Check if the current bit is set in the current number
      if ((nums[i] & (1 << bit)) > 0) {
        lastSeen[bit] = i; // Update the last seen index for this bit
      }
      // Update the result array with the maximum length of the subarray that can be formed by including
      // the current number and the previously seen numbers with the same bit set
      res[i] = Math.max(res[i], lastSeen[bit] - i + 1);
    }
  }

  return res;
}

// Editorial
function smallestSubarrays2(nums: number[]): number[] {
  const n = nums.length;
  const pos: number[] = new Array(31).fill(-1);
  const ans: number[] = new Array(n);
  for (let i = n - 1; i >= 0; --i) {
    let j = i;
    for (let bit = 0; bit < 31; ++bit) {
      if (!(nums[i] & (1 << bit))) {
        if (pos[bit] !== -1) {
          j = Math.max(j, pos[bit]);
        }
      } else {
        pos[bit] = i;
      }
    }
    ans[i] = j - i + 1;
  }
  return ans;
}
