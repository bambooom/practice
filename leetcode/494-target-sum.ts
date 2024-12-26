// https://leetcode.com/problems/target-sum/
// #dynamic-programming #backtracking

function findTargetSumWays(nums: number[], S: number): number {
  if (nums.length === 0 || !nums) return 0;
  const sum = nums.reduce((acc, cur) => acc + cur);
  if (Math.abs(S) > Math.abs(sum)) return 0;
  else if (Math.abs(S) === Math.abs(sum)) return 1;

  // Set initial sum to zero and its count to one.
  // Go through each number in the array and pre-calculate the next sums based on prevous sums / amounts.
  let sums = new Map<number, number>([[0, 1]]); // Map(1){0 => 1}
  for (const num of nums) {
    const next = new Map<number, number>();

    for (const [sum, amount] of sums) {
      const plus = sum + num;
      const minus = sum - num;

      next.set(
        plus,
        next.has(plus) ? (next.get(plus) as number) + amount : amount,
      );
      next.set(
        minus,
        next.has(minus) ? (next.get(minus) as number) + amount : amount,
      );
    }

    sums = next;
  }

  return sums.has(S) ? (sums.get(S) as number) : 0;
}

console.log(findTargetSumWays([1, 0], 1)); // get 1, wrong, expected 2, why?

function findTargetSumWays2(nums: number[], target: number): number {
  let sum = 0;
  for (const num of nums) {
    sum += num;
  }
  const diff = sum - target;
  if (diff < 0 || diff % 2 !== 0) {
    return 0;
  }
  const n = nums.length,
    neg = diff / 2;
  const dp = new Array(n + 1).fill(0).map(() => new Array(neg + 1).fill(0));
  dp[0][0] = 1;
  for (let i = 1; i <= n; i++) {
    const num = nums[i - 1];
    for (let j = 0; j <= neg; j++) {
      dp[i][j] = dp[i - 1][j];
      if (j >= num) {
        dp[i][j] += dp[i - 1][j - num];
      }
    }
  }
  return dp[n][neg];
}

console.log(findTargetSumWays2([1, 0], 1)); // expected 2?

// https://leetcode.com/problems/target-sum/solutions/5364411/standard-backtracking-pattern/
function findTargetSumWays3(nums: number[], target: number): number {
  let count = 0;

  const backtrack = (index: number, sum: number) => {
    if (index === nums.length) {
      if (sum === target) {
        count++;
      }
      return;
    }

    // add the current number
    backtrack(index + 1, sum + nums[index]);
    // subtrack the current number
    backtrack(index + 1, sum - nums[index]);
  };

  backtrack(0, 0);
  return count;
}
