// https://leetcode.com/problems/jump-game
// You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.
// Return true if you can reach the last index, or false otherwise.

// Example 1:
// Input: nums = [2,3,1,1,4]
// Output: true
// Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
// Example 2:
// Input: nums = [3,2,1,0,4]
// Output: false
// Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.

// https://leetcode.com/problems/jump-game/solutions/2531333/simple-ts-with-explanation/?envType=study-plan-v2&envId=top-100-liked
// Practically speaking, if the array contains no stopping points (nums[i] = 0 for any i) then we can always reach the end index by always jumping 1 step forward regardless of the value we are standing at
// Let us say we want to move one step at a time and store how many steps are left to carry us forward, and if we have none left then we break early and return false
function canJump(nums: number[]): boolean {
  let left = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // no ways to move forward and we have ran out of steps
    if (left === 0) {
      return false;
    }
    // store how many steps are left for the previous index, and if we are standing on a new index whose nums[i] value gives us more steps, then we "reimburse" ourselves with that new value by replacing left with nums[i]
    left = Math.max(left - 1, nums[i]);
  }
  return true;
}

// https://leetcode.com/problems/jump-game/solutions/4404538/o-n-time-o-1-space-explained/?envType=study-plan-v2&envId=top-100-liked
// Start from the index we know we can reach the end from (the end index!) and work our way backwards checking if each progessively earlier index can reach an index that can reach the end and updating the last index that can reach the end as we find it.
// seems faster
function canJump2(nums: number[]): boolean {
  let lastJump = nums.length - 1;

  for (let i = lastJump - 1; i > 0; i--) {
    if (nums[i] >= lastJump - i) {
      lastJump = i;
    }
  }

  return nums[0] >= lastJump;
}
