// https://leetcode.com/problems/max-sum-of-a-pair-with-equal-sum-of-digits/description/
// You are given a 0-indexed array nums consisting of positive integers. You can choose two indices i and j, such that i != j, and the sum of digits of the number nums[i] is equal to that of nums[j].
// Return the maximum value of nums[i] + nums[j] that you can obtain over all possible indices i and j that satisfy the conditions.

// Example 1:
// Input: nums = [18,43,36,13,7]
// Output: 54
// Explanation: The pairs (i, j) that satisfy the conditions are:
// - (0, 2), both numbers have a sum of digits equal to 9, and their sum is 18 + 36 = 54.
// - (1, 4), both numbers have a sum of digits equal to 7, and their sum is 43 + 7 = 50.
// So the maximum sum that we can obtain is 54.

// Example 2:
// Input: nums = [10,12,19,14]
// Output: -1
// Explanation: There are no two numbers that satisfy the conditions, so we return -1.

// use hashmap, two sum
function maximumSum(nums: number[]): number {
  const getDigitsSum = (n: number): number => {
    return n
      .toString()
      .split('')
      .reduce((a, b) => a + +b, 0);
  };

  const map = new Map<number, number>();
  let ans = -1;

  for (let i = 0; i < nums.length; i++) {
    const sum = getDigitsSum(nums[i]);

    if (map.has(sum)) {
      const curr = map.get(sum)!;
      const max = Math.max(curr, nums[i]);

      ans = Math.max(ans, curr + nums[i]);
      map.set(sum, max);
    } else {
      map.set(sum, nums[i]);
    }
  }

  return ans;
}

// straight forward solution, but TLE
function maximumSum_TLE(nums: number[]): number {
  const getDigitsSum = (n: number): number => {
    return n
      .toString()
      .split('')
      .reduce((a, b) => a + +b, 0);
  };
  let maxSum = -1;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (getDigitsSum(nums[i]) === getDigitsSum(nums[j])) {
        maxSum = Math.max(maxSum, nums[i] + nums[j]);
      }
    }
  }

  return maxSum;
}
