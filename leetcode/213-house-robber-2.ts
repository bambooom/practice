// https://leetcode.com/problems/house-robber-ii/
// All houses at this place are arranged in a circle.
// #dynamic-programming

function rob(nums: number[]): number {
  if (nums.length === 1) return nums[0];
  if (nums.length === 2) return Math.max(...nums);
  if (nums.length === 0) return 0;

  let first1 = nums[0];
  let last1 = Math.max(nums[0], nums[1]);

  let first2 = nums[1];
  let last2 = Math.max(nums[1], nums[2]);

  for (let i = 2; i < nums.length - 1; i++) {
    const temp1 = Math.max(first1 + nums[i], last1);
    first1 = last1;
    last1 = temp1;

    const temp2 = Math.max(first2 + nums[i + 1], last2);
    first2 = last2;
    last2 = temp2;
  }

  return Math.max(last1, last2);
}

// DP solution
function rob2(nums: number[]): number {
  if (nums.length <= 3) {
    return Math.max(...nums);
  }
  const money1 = robHelper(0, nums.length - 2, nums);
  const money2 = robHelper(1, nums.length - 1, nums);
  return Math.max(money1, money2);
  // T.C: O(N)
  // S.C: O(N)
}

/*
dp[i] is the max amount of money that can be robbed without alerting the police at house i

dp[i] = max(dp[i-1], dp[i-2] + nums[i])
because if we rob the previous house, we can't rob the current house, but, else,
we can rob the current house and still take the money robbed until the previous, previous house
*/
const robHelper = (start: number, end: number, nums: number[]) => {
  const dp = new Array(start + (end - start + 1));
  for (let i = start; i <= end; i++) {
    dp[i] = Math.max(
      dp[i - 1] ? dp[i - 1] : 0,
      (dp[i - 2] ? dp[i - 2] : 0) + nums[i],
    );
  }
  return dp[end];
};
