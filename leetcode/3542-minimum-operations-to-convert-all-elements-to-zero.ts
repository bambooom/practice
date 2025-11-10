// https://leetcode.com/problems/minimum-operations-to-convert-all-elements-to-zero/
// You are given an array nums of size n, consisting of non-negative integers. Your task is to apply some (possibly zero) operations on the array so that all elements become 0.
// In one operation, you can select a subarray [i, j] (where 0 <= i <= j < n) and set all occurrences of the minimum non-negative integer in that subarray to 0.
// Return the minimum number of operations required to make all elements in the array 0.

// Example 1:
// Input: nums = [0,2]
// Output: 1
// Explanation:
// Select the subarray [1,1] (which is [2]), where the minimum non-negative integer is 2. Setting all occurrences of 2 to 0 results in [0,0].
// Thus, the minimum number of operations required is 1.

// Example 2:
// Input: nums = [3,1,2,1]
// Output: 3
// Explanation:
// Select subarray [1,3] (which is [1,2,1]), where the minimum non-negative integer is 1. Setting all occurrences of 1 to 0 results in [3,0,2,0].
// Select subarray [2,2] (which is [2]), where the minimum non-negative integer is 2. Setting all occurrences of 2 to 0 results in [3,0,0,0].
// Select subarray [0,0] (which is [3]), where the minimum non-negative integer is 3. Setting all occurrences of 3 to 0 results in [0,0,0,0].
// Thus, the minimum number of operations required is 3.

// Example 3:
// Input: nums = [1,2,1,2,1,2]
// Output: 4
// Explanation:
// Select subarray [0,5] (which is [1,2,1,2,1,2]), where the minimum non-negative integer is 1. Setting all occurrences of 1 to 0 results in [0,2,0,2,0,2].
// Select subarray [1,1] (which is [2]), where the minimum non-negative integer is 2. Setting all occurrences of 2 to 0 results in [0,0,0,2,0,2].
// Select subarray [3,3] (which is [2]), where the minimum non-negative integer is 2. Setting all occurrences of 2 to 0 results in [0,0,0,0,0,2].
// Select subarray [5,5] (which is [2]), where the minimum non-negative integer is 2. Setting all occurrences of 2 to 0 results in [0,0,0,0,0,0].
// Thus, the minimum number of operations required is 4.

// Constraints:
// 1 <= n == nums.length <= 10^5
// 0 <= nums[i] <= 10^5

// Through observation, we can establish the following rules:
// Rule 1: Setting several identical minimum values to 0 simultaneously can reduce the number of operations.
// Rule 2: If smaller numbers exist between two identical numbers, those numbers cannot be turned into 0 together.

// https://leetcode.com/problems/minimum-operations-to-convert-all-elements-to-zero/solutions/7338344/solution-of-the-day-9987-beats-simple-ex-vb7s/?envType=daily-question&envId=2025-11-10
// The approach used in this code is based on a monotonic stack to efficiently track the elements and calculate the number of operations needed
function minOperations(nums: number[]): number {
  // Initialize a stack to keep track of elements in a decreasing order
  const s: number[] = [];
  let res = 0;

  for (const a of nums) {
    // Pop elements from the stack until the top element is smaller than the current element
    while (s.length && s[s.length - 1] > a) {
      s.pop();
    }
    // If the current element is zero, continue to the next iteration
    if (a === 0) {
      continue;
    }
    // If the stack is empty or the top element is smaller than the current element, increment the res variable and push the current element onto the stack
    if (!s.length || s[s.length - 1] < a) {
      res++;
      s.push(a);
    }
  }

  return res;
}
