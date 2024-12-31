// https://leetcode.com/problems/minimum-cost-for-tickets

// You have planned some train traveling one year in advance. The days of the year in which you will travel are given as an integer array days. Each day is an integer from 1 to 365.

// Train tickets are sold in three different ways:

// a 1-day pass is sold for costs[0] dollars,
// a 7-day pass is sold for costs[1] dollars, and
// a 30-day pass is sold for costs[2] dollars.
// The passes allow that many days of consecutive travel.

// For example, if we get a 7-day pass on day 2, then we can travel for 7 days: 2, 3, 4, 5, 6, 7, and 8.
// Return the minimum number of dollars you need to travel every day in the given list of days.

// Example 1:

// Input: days = [1,4,6,7,8,20], costs = [2,7,15]
// Output: 11
// Explanation: For example, here is one way to buy passes that lets you travel your travel plan:
// On day 1, you bought a 1-day pass for costs[0] = $2, which covered day 1.
// On day 3, you bought a 7-day pass for costs[1] = $7, which covered days 3, 4, ..., 9.
// On day 20, you bought a 1-day pass for costs[0] = $2, which covered day 20.
// In total, you spent $11 and covered all the days of your travel.
// Example 2:

// Input: days = [1,2,3,4,5,6,7,8,9,10,30,31], costs = [2,7,15]
// Output: 17
// Explanation: For example, here is one way to buy passes that lets you travel your travel plan:
// On day 1, you bought a 30-day pass for costs[2] = $15 which covered days 1, 2, ..., 30.
// On day 31, you bought a 1-day pass for costs[0] = $2 which covered day 31.
// In total, you spent $17 and covered all the days of your travel.

// https://leetcode.com/problems/minimum-cost-for-tickets/solutions/3350897/typescript-solution-basic-intutition/
// every day you can either travel or not traval, incase not travel, yyou can either 1-day, 7-day or 30-day pass
function mincostTickets(days: number[], costs: number[]): number {
  const daySet = new Set(days);
  const cache = new Array(days.length);

  const dp = (d: number): number => {
    if (d > 365) {
      return 0;
    }

    if (typeof cache[d] !== 'undefined') {
      return cache[d];
    }

    return (cache[d] = !daySet.has(d)
      ? dp(d + 1) // d is not among travelling days, skipping
      : Math.min(
          costs[0] + dp(d + 1),
          costs[1] + dp(d + 7),
          costs[2] + dp(d + 30),
        ));
  };

  return dp(1);
}
