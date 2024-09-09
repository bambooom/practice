// https://leetcode.com/problems/longest-increasing-subsequence/
// Given an integer array nums, return the length of the longest strictly increasing subsequence.
// #binary-search, #dynamic-programming

// Example 1:
// Input: nums = [10,9,2,5,3,7,101,18]
// Output: 4
// Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
// Example 2:
// Input: nums = [0,1,0,3,2,3]
// Output: 4
// Example 3:
// Input: nums = [7,7,7,7,7,7,7]
// Output: 1

// DP way. https://leetcode.com/problems/longest-increasing-subsequence/solutions/1680012/javascript-dp-solution-with-written-intuition/
/**
 *
Time: O(n^2) - nested loops of length n
Space: O(n) - single array of length n

Strategy and Intuition:
1. The longest increasing subsequence (LIS) at any point is at least 1.
  - Take the example [10, 9, 2]. At every index, we can't do any worse than 1.
2. To figure out if we can do better than 1, we'll need to compare two numbers. This sets the grounds for using two loops to compare nums[i] against nums[j].
3. If we find that nums[j] < nums[i], we may have found a longer increasing subsequence at index i.
  - In plain English, the current num at i is greater than the prev num at j. Update the LIS at i if the LIS at j plus 1 is greater than it.
  - In Javascript, Math.max(dp[i], dp[j]+1);
4. To be able to refer back to previously calculated LIS answers, we'll need to save them somewhere. This is the basis of our dp array.
 */
function lengthOfLIS(nums: number[]): number {
  const dp = new Array(nums.length).fill(1);
  let longest = 1;
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    longest = Math.max(longest, dp[i]);
  }
  return longest;
}

const lengthOfLIS2 = (nums: number[]): number => {
  return nums.reduce(
    (sequence, num) => {
      if (num > sequence[sequence.length - 1]) sequence.push(num);
      else sequence[sequence.findIndex((val) => val >= num)] = num;
      return sequence;
    },
    [nums[0]],
  ).length;
};

// binary search method: https://leetcode.com/problems/longest-increasing-subsequence/solutions/1395285/javascript-all-3-solutions/
const binarySearch = (array: number[], currVal: number): number => {
  let left = 0;
  let right = array.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (array[mid] < currVal) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return left;
};

const lengthOfLIS3 = function (nums: number[]): number {
  const sub = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    const currVal = nums[i];
    if (currVal > sub[sub.length - 1]) {
      sub.push(currVal);
    } else {
      const j = binarySearch(sub, currVal);
      sub[j] = currVal;
    }
  }
  return sub.length;
};
