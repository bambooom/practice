// https://leetcode.com/problems/largest-divisible-subset
// Given a set of distinct positive integers nums, return the largest subset answer such that every pair (answer[i], answer[j]) of elements in this subset satisfies:
// answer[i] % answer[j] == 0, or
// answer[j] % answer[i] == 0
// If there are multiple solutions, return any of them.

// Example 1:
// Input: nums = [1,2,3]
// Output: [1,2]
// Explanation: [1,3] is also accepted.

// Example 2:
// Input: nums = [1,2,4,8]
// Output: [1,2,4,8]

function largestDivisibleSubset(nums: number[]): number[] {
  nums.sort((a, b) => a - b);

  let ans: number[] = [];
  let largest = 0; // keep track of largest subset size

  // store divisible subset
  const dp: number[][] = Array.from({ length: nums.length }, () => []);
  // store size of each subset
  const arr: number[] = new Array(nums.length).fill(0);

  // finds the largest divisible subset starting from a given index idx in the sorted array.
  const search = (idx: number): number => {
    let temp = 0;
    let tempArr: number[] = [];

    // search largest in subset
    for (let i = idx + 1; i < nums.length; i++) {
      if (nums[i] % nums[idx] === 0) {
        if (arr[i] > temp) {
          temp = arr[i];
          tempArr = [...dp[i]];
        }
      }
    }

    // put back value
    arr[idx] = temp + 1;
    dp[idx] = [nums[idx], ...tempArr];

    return arr[idx];
  };

  for (let i = nums.length - 1; i >= 0; i--) {
    const temp = search(i);

    // store largest record
    if (temp > largest) {
      largest = temp;
      ans = dp[i];
    }
  }

  return ans;
}

function largestDivisibleSubset2(nums: number[]): number[] {
  const n = nums.sort((a, b) => a - b).length;
  const dp = Array(n).fill(1); // store the size of largest divisible subset ending at each index
  const pred = Array(n).fill(-1); // store the previous index in the subset
  const res: number[] = [];

  let max = 0;

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      // for each pair check divisible by previous element
      if (nums[i] % nums[j] === 0 && dp[i] <= dp[j]) {
        dp[i] = dp[j] + 1;
        pred[i] = j;
      }
    }
    // update the maximum size of the subset
    if (dp[i] > dp[max]) {
      max = i;
    }
  }

  // backtracking from the index with maximum size
  // to construct the largest divisible subset
  while (max >= 0) {
    res.push(nums[max]);
    max = pred[max];
  }

  return res;
}
