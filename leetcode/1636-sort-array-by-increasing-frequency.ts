// https://leetcode.com/problems/sort-array-by-increasing-frequency/
// Given an array of integers nums, sort the array in increasing order based on the frequency of the values. If multiple values have the same frequency, sort them in decreasing order.

// Return the sorted array.

// Example 1:

// Input: nums = [1,1,2,2,2,3]
// Output: [3,1,1,2,2,2]
// Explanation: '3' has a frequency of 1, '1' has a frequency of 2, and '2' has a frequency of 3.
// Example 2:

// Input: nums = [2,3,1,3,2]
// Output: [1,3,3,2,2]
// Explanation: '2' and '3' both have a frequency of 2, so they are sorted in decreasing order.
// Example 3:

// Input: nums = [-1,1,-6,4,5,-6,1,4,1]
// Output: [5,-1,4,4,-6,-6,1,1,1]

// my solution, not memory efficient
function frequencySort(nums: number[]): number[] {
  const freq: Record<number, number> = {};
  for (const v of nums) {
    freq[v] = (freq[v] || 0) + 1;
  }

  const sorted = Object.entries(freq).sort((a, b) => {
    if (a[1] === b[1]) {
      return Number(b[0]) - Number(a[0]);
    }
    return a[1] - b[1];
  });
  const res: number[] = [];

  for (const e of sorted) {
    const p = Array(e[1]).fill(Number(e[0]));
    res.push(...p);
  }
  return res;
}

// https://leetcode.com/problems/sort-array-by-increasing-frequency/solutions/1486646/typescript-clean-and-simple-solution/?envType=daily-question&envId=2024-07-23
function frequencySort2(nums: number[]): number[] {
  const freq: Record<number, number> = {};

  nums.forEach((num) => (freq[num] = (freq[num] || 0) + 1));

  return nums.sort((a, b) => (freq[a] != freq[b] ? freq[a] - freq[b] : b - a));
}
