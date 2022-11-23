/**
 * given an array prices where prices[i] is the price of a given stock on the ith day.
 * You want to maximize your profit by choosing a single day to buy one stock and
 * choosing a different day in the future to sell that stock.
 *
 * Return the maximum profit you can achieve from this transaction.
 * If you cannot achieve any profit, return 0
 */

// input: [7,1,5,3,6,4]
// output: 5
// bruta force, time O(n^2) spce O(1)
export function maxProfit(prices: number[]): number {
  let max = 0;
  for (let i = 0; i < prices.length; i++) {
    const subMax = Math.max(...prices.slice(i));
    max = Math.max(max, subMax - prices[i]);
  }
  return max;
}

// one pass
// The points of interest are the peaks and valleys in the given graph.
// We need to find the largest price following each valley, which difference could be the max profit.
// time O(n), spce O(1)
export function maxProfit2(prices: number[]): number {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    } else if (prices[i] - minPrice > maxProfit) {
      maxProfit = prices[i] - minPrice;
    }
  }

  return maxProfit;
}
