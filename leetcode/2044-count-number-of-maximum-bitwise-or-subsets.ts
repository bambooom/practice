// https://leetcode.com/problems/count-number-of-maximum-bitwise-or-subsets

// Given an integer array nums, find the maximum possible bitwise OR of a subset of nums and return the number of different non-empty subsets with the maximum bitwise OR.
// An array a is a subset of an array b if a can be obtained from b by deleting some (possibly zero) elements of b. Two subsets are considered different if the indices of the elements chosen are different.
// The bitwise OR of an array a is equal to a[0] OR a[1] OR ... OR a[a.length - 1] (0-indexed).

// Example 1:
// Input: nums = [3,1]
// Output: 2
// Explanation: The maximum possible bitwise OR of a subset is 3. There are 2 subsets with a bitwise OR of 3:
// - [3]
// - [3,1]

// Example 2:
// Input: nums = [2,2,2]
// Output: 7
// Explanation: All non-empty subsets of [2,2,2] have a bitwise OR of 2. There are 23 - 1 = 7 total subsets.

// Example 3:
// Input: nums = [3,2,1,5]
// Output: 6
// Explanation: The maximum possible bitwise OR of a subset is 7. There are 6 subsets with a bitwise OR of 7:
// - [3,5]
// - [3,1,5]
// - [3,2,5]
// - [3,2,1,5]
// - [2,5]
// - [2,1,5]

function countMaxOrSubsets(nums: number[]): number {
  let arr: number[] = [];
  let count = 0;
  const max = nums.reduce((a, b) => a | b);

  for (let i = 0; i < nums.length; i++) {
    const temp = arr.slice();

    if (nums[i] === max) {
      count++;
    }

    temp.push(nums[i]);

    for (let j = 0; j < arr.length; j++) {
      const newEle = temp[j] | nums[i];

      if (newEle === max) {
        count++;
      }

      temp.push(newEle);
    }

    arr = [...temp];
  }

  return count;
}

// https://leetcode.com/problems/count-number-of-maximum-bitwise-or-subsets/solutions/5928822/time-o-2-n-space-o-n/
// dfs
function countMaxOrSubsets2(nums: number[]): number {
  let maxOR = 0; // maximum possible bitwise OR value
  for (const num of nums) {
    maxOR |= num;
  }

  // use dfs to explore all possible subsets of the input array.
  const dfs = (
    nums: number[], // input array
    i: number, // current index
    val: number, // current bitwise OR value
    goal: number, // goal: maximum bitwise OR value
  ): number => {
    if (i < 0) {
      // it means we've reached the end of the array
      // and we return 1 if the current bitwise OR value equals the goal, and 0 otherwise.
      return +(val == goal);
    }
    // recursively calls itself twice
    // once with the current index decremented and the current bitwise OR value unchanged
    // once with the current index decremented and the current bitwise OR value updated by performing a bitwise OR operation with the current element
    // return sum of two calls
    return dfs(nums, i - 1, val, goal) + dfs(nums, i - 1, val | nums[i], goal);
  };

  return dfs(nums, nums.length - 1, 0, maxOR);
}
