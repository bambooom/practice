// https://leetcode.com/problems/maximum-ice-cream-bars/
// #greedy #sort

// At the store, there are n ice cream bars. You are given an array costs of length n, where costs[i] is the price of the ith ice cream bar in coins. The boy initially has coins coins to spend, and he wants to buy as many ice cream bars as possible.
// Return the maximum number of ice cream bars the boy can buy with coins coins.

function maxIceCream(costs: number[], coins: number): number {
  costs.sort((a, b) => a - b);
  let count = 0;
  for (let i = 0; i < costs.length; i++) {
    if (costs[i] <= coins) {
      count++;
      coins -= costs[i];
    } else {
      break;
    }
  }

  return count;
}
