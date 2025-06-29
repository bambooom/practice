// https://leetcode.com/problems/number-of-subsequences-that-satisfy-the-given-sum-condition
// You are given an array of integers nums and an integer target.
// Return the number of non-empty subsequences of nums such that the sum of the minimum and maximum element on it is less or equal to target. Since the answer may be too large, return it modulo 109 + 7.

// Example 1:
// Input: nums = [3,5,6,7], target = 9
// Output: 4
// Explanation: There are 4 subsequences that satisfy the condition.
// [3] -> Min value + max value <= target (3 + 3 <= 9)
// [3,5] -> (3 + 5 <= 9)
// [3,5,6] -> (3 + 6 <= 9)
// [3,6] -> (3 + 6 <= 9)

// Example 2:
// Input: nums = [3,3,6,8], target = 10
// Output: 6
// Explanation: There are 6 subsequences that satisfy the condition. (nums can have repeated numbers).
// [3] , [3] , [3,3], [3,6] , [3,6] , [3,3,6]

// Example 3:
// Input: nums = [2,3,3,4,6,7], target = 12
// Output: 61
// Explanation: There are 63 non-empty subsequences, two of them do not satisfy the condition ([6,7], [7]).
// Number of valid subsequences (63 - 2 = 61).

// https://leetcode.com/problems/number-of-subsequences-that-satisfy-the-given-sum-condition/solutions/3491796/c-and-typescript-solution-with-approach/?envType=daily-question&envId=2025-06-29
function numSubseq(nums: number[], target: number): number {
  nums.sort((a, b) => a - b);

  const mod = 1e9 + 7;
  const n = nums.length;
  let ans = 0;

  // calculate powers of 2 modulo mod
  const pow2: number[] = new Array(n);
  pow2[0] = 1;
  for (let i = 1; i < n; i++) {
    pow2[i] = (pow2[i - 1] * 2) % mod;
  }

  // use two pointers to find subsequences
  let left = 0;
  let right = n - 1;
  while (left <= right) {
    // if the sum of the minimum and maximum values is less than or equal to target
    // add the number of subsequences of length (right - left) to the answer
    if (nums[left] + nums[right] <= target) {
      ans = (ans + pow2[right - left]) % mod;
      left++;
    }
    // otherwise, move the right pointer to the elft
    else {
      right--;
    }
  }

  return ans;
}
