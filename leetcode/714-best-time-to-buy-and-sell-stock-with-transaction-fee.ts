// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/
// #dynamic-programming
// You are given an array prices where prices[i] is the price of a given stock on the ith day, and an integer fee representing a transaction fee.
// Find the maximum profit you can achieve. You may complete as many transactions as you like, but you need to pay the transaction fee for each transaction.
// Note:
// You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).
// The transaction fee is only charged once for each stock purchase and sale.

// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/solutions/3667791/very-simple-for-loop-solution-in-typescript-t-o-n-s-o-1/?envType=study-plan-v2&envId=leetcode-75
function maxProfit(prices: number[], fee: number): number {
  let cash = 0;
  let hold = -Infinity;

  for (let i = 0; i < prices.length; i++) {
    cash = Math.max(cash, hold + prices[i] - fee);
    hold = Math.max(hold, cash - prices[i]);
  }

  return cash;
}
