// https://leetcode.com/problems/min-cost-climbing-stairs/
// You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps.
// You can either start from the step with index 0, or the step with index 1.
// Return the minimum cost to reach the top of the floor.

// #dynamic-programming

// Trick: At index [i], you only need to know the min cost when stepping on [i - 1] and [i - 2].
// This is a slight variation on fibonacci
function minCostClimbingStairs(cost: number[]): number {
  if (cost.length === 1) return 0;
  if (cost.length === 2) return Math.min(cost[0], cost[1]);
  let minCostTwoBefore = cost[0];
  let minCostOneBefore = cost[1];

  for (let n = 2; n < cost.length; n++) {
    const minCostAtCurrent =
      cost[n] + Math.min(minCostOneBefore, minCostTwoBefore);

    minCostTwoBefore = minCostOneBefore;
    minCostOneBefore = minCostAtCurrent;
  }

  return Math.min(minCostOneBefore, minCostTwoBefore);
}
