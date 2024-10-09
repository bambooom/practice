// https://leetcode.com/problems/longest-consecutive-sequence
// Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.
// You must write an algorithm that runs in O(n) time.

// Example 1:
// Input: nums = [100,4,200,1,3,2]
// Output: 4
// Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
// Example 2:
// Input: nums = [0,3,7,2,5,8,4,6,0,1]
// Output: 9

// https://leetcode.com/problems/longest-consecutive-sequence/solutions/4069154/clean-typescript-solution-beats-85-13-o-n/?envType=study-plan-v2&envId=top-100-liked
function longestConsecutive(nums: number[]): number {
  const set = new Set(nums);
  let max = 0;

  for (const num of nums) {
    if (set.has(num + 1)) {
      continue;
    }

    let counter = 1;
    let current = num;

    while (set.has(--current)) {
      counter++;
    }

    max = Math.max(counter, max);
  }

  return max;
}
