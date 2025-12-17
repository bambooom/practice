// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-v/
// You are given an integer array prices where prices[i] is the price of a stock in dollars on the ith day, and an integer k.
// You are allowed to make at most k transactions, where each transaction can be either of the following:
// Normal transaction: Buy on day i, then sell on a later day j where i < j. You profit prices[j] - prices[i].
// Short selling transaction: Sell on day i, then buy back on a later day j where i < j. You profit prices[i] - prices[j].
// Note that you must complete each transaction before starting another. Additionally, you can't buy or sell on the same day you are selling or buying back as part of a previous transaction.
// Return the maximum total profit you can earn by making at most k transactions.

// Example 1:
// Input: prices = [1,7,9,8,2], k = 2
// Output: 14
// Explanation:
// We can make $14 of profit through 2 transactions:
// A normal transaction: buy the stock on day 0 for $1 then sell it on day 2 for $9.
// A short selling transaction: sell the stock on day 3 for $8 then buy back on day 4 for $2.

// Example 2:
// Input: prices = [12,16,19,19,8,1,19,13,9], k = 3
// Output: 36
// Explanation:
// We can make $36 of profit through 3 transactions:
// A normal transaction: buy the stock on day 0 for $12 then sell it on day 2 for $19.
// A short selling transaction: sell the stock on day 3 for $19 then buy back on day 4 for $8.
// A normal transaction: buy the stock on day 5 for $1 then sell it on day 6 for $19.

// Constraints:
// 2 <= prices.length <= 10^3
// 1 <= prices[i] <= 10^9
// 1 <= k <= prices.length / 2

// This turns into a very simple DP problem. Each day (i.e., price), we can:
//  - Buy the stock using the previous sell or cover balance;
//  - Sell the stock using the current buy balance;
//  - Short-sell a stock using the previous sell or cover balance;
//  - Cover the short using the current short balance; or
//  - Do nothing and hold our current position.
function maximumProfit(prices: number[], k: number): number {
  // The four arrays track the best profit we can hold after completing i + 1 transactions:
  //  - buys[i]   ⇒ currently holding a long share after the i-th transaction finished with a sell/cover.
  //  - sells[i]  ⇒ realized profit after closing a long position i + 1 times.
  //  - shorts[i] ⇒ currently holding an open short that was opened after i completed transactions.
  //  - covers[i] ⇒ realized profit after closing a short position i + 1 times.
  const buys: number[] = new Array(k).fill(-Infinity);
  const sells: number[] = new Array(k).fill(0);
  const shorts: number[] = new Array(k).fill(-Infinity);
  const covers: number[] = new Array(k).fill(0);

  for (const price of prices) {
    // Update the buys array based on the previous values and the current price.
    for (let i = 0; i < k; i++) {
      buys[i] = Math.max(
        buys[i],
        (sells[i - 1] ?? 0) - price, // Reinvest the profit from the previous sell.
        (covers[i - 1] ?? 0) - price, // Buy using the previous cover balance.
      );
      shorts[i] = Math.max(
        shorts[i],
        (sells[i - 1] ?? 0) + price, // Short-sell by immediately offsetting the current long profit.
        (covers[i - 1] ?? 0) + price, // Short-sell after covering a previous short.
      );
    }
    // Once the potential entries are refreshed, settle profits by closing open positions.
    for (let i = 0; i < k; i++) {
      sells[i] = Math.max(sells[i], buys[i] + price); // Close a long position to realize profit.
      covers[i] = Math.max(covers[i], shorts[i] - price); // Close a short by buying back shares cheaper.
    }
  }
  // Return the maximum value in the sells or covers array, depending on which one is greater.
  return Math.max(sells.at(-1)!, covers.at(-1)!);
}
