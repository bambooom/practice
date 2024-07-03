// https://leetcode.com/problems/minimum-difference-between-largest-and-smallest-value-in-three-moves/
// You are given an integer array nums.
// In one move, you can choose one element of nums and change it to any value.
// Return the minimum difference between the largest and smallest value of nums after performing at most three moves.

// Example 1:
// Input: nums = [5,3,2,4]
// Output: 0
// Explanation: We can make at most 3 moves.
// In the first move, change 2 to 3. nums becomes [5,3,3,4].
// In the second move, change 4 to 3. nums becomes [5,3,3,3].
// In the third move, change 5 to 3. nums becomes [3,3,3,3].
// After performing 3 moves, the difference between the minimum and maximum is 3 - 3 = 0.

//https://leetcode.com/problems/minimum-difference-between-largest-and-smallest-value-in-three-moves/solutions/1893373/100-fastest-typescript-solution/?envType=daily-question&envId=2024-07-03

function minDifference(nums: number[]): number {
  const len = nums.length;
  if (len <= 4) return 0;

  nums.sort((a, b) => a - b);

  const opts = [
    nums[len - 4] - nums[0],
    nums[len - 3] - nums[1],
    nums[len - 2] - nums[2],
    nums[len - 1] - nums[3],
  ];

  return Math.min(...opts);
}

// https://leetcode.com/problems/minimum-difference-between-largest-and-smallest-value-in-three-moves/solutions/5406525/minimum-difference-between-largest-and-smallest-value-in-three-moves/?envType=daily-question&envId=2024-07-03
function minDifference2(nums: number[]): number {
  const len = nums.length;
  if (len <= 4) return 0;

  nums.sort((a, b) => a - b);

  let minDiff = Infinity;
  for (let i = 0; i <= 3; i++) {
    minDiff = Math.min(minDiff, nums[len - 4 + i] - nums[i]);
  }

  return minDiff;
}
