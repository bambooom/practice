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
