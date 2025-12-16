// https://leetcode.com/problems/maximum-profit-from-trading-stocks-with-discounts
// You are given an integer n, representing the number of employees in a company.
// Each employee is assigned a unique ID from 1 to n, and employee 1 is the CEO.
// You are given two 1-based integer arrays, present and future, each of length n, where:
//  - present[i] represents the current price at which the ith employee can buy a stock today.
//  - future[i] represents the expected price at which the ith employee can sell the stock tomorrow.
// The company's hierarchy is represented by a 2D integer array hierarchy, where hierarchy[i] = [ui, vi] means that employee ui is the direct boss of employee vi.
// Additionally, you have an integer budget representing the total funds available for investment.
// However, the company has a discount policy: if an employee's direct boss purchases their own stock,
// then the employee can buy their stock at half the original price (floor(present[v] / 2)).
// Return the maximum profit that can be achieved without exceeding the given budget.

// Note:
// You may buy each stock at most once.
// You cannot use any profit earned from future stock prices to fund additional investments and must buy only from budget.

// Example 1:
// Input: n = 2, present = [1,2], future = [4,3], hierarchy = [[1,2]], budget = 3
// Output: 5
// Explanation:
// Employee 1 buys the stock at price 1 and earns a profit of 4 - 1 = 3.
// Since Employee 1 is the direct boss of Employee 2, Employee 2 gets a discounted price of floor(2 / 2) = 1.
// Employee 2 buys the stock at price 1 and earns a profit of 3 - 1 = 2.
// The total buying cost is 1 + 1 = 2 <= budget. Thus, the maximum total profit achieved is 3 + 2 = 5.

// Example 2:
// Input: n = 2, present = [3,4], future = [5,8], hierarchy = [[1,2]], budget = 4
// Output: 4
// Explanation:
// Employee 2 buys the stock at price 4 and earns a profit of 8 - 4 = 4.
// Since both employees cannot buy together, the maximum profit is 4.

// Example 3:
// Input: n = 3, present = [4,6,8], future = [7,9,11], hierarchy = [[1,2],[1,3]], budget = 10
// Output: 10
// Explanation:
// Employee 1 buys the stock at price 4 and earns a profit of 7 - 4 = 3.
// Employee 3 would get a discounted price of floor(8 / 2) = 4 and earns a profit of 11 - 4 = 7.
// Employee 1 and Employee 3 buy their stocks at a total cost of 4 + 4 = 8 <= budget. Thus, the maximum total profit achieved is 3 + 7 = 10.

// Example 4:
// Input: n = 3, present = [5,2,3], future = [8,5,6], hierarchy = [[1,2],[2,3]], budget = 7
// Output: 12
// Explanation:
// Employee 1 buys the stock at price 5 and earns a profit of 8 - 5 = 3.
// Employee 2 would get a discounted price of floor(2 / 2) = 1 and earns a profit of 5 - 1 = 4.
// Employee 3 would get a discounted price of floor(3 / 2) = 1 and earns a profit of 6 - 1 = 5.
// The total cost becomes 5 + 1 + 1 = 7 <= budget. Thus, the maximum total profit achieved is 3 + 4 + 5 = 12.

// Constraints:
// 1 <= n <= 160
// present.length, future.length == n
// 1 <= present[i], future[i] <= 50
// hierarchy.length == n - 1
// hierarchy[i] == [ui, vi]
// 1 <= ui, vi <= n
// ui != vi
// 1 <= budget <= 160
// There are no duplicate edges.
// Employee 1 is the direct or indirect boss of every employee.
// The input graph hierarchy is guaranteed to have no cycles.

// https://leetcode.com/problems/maximum-profit-from-trading-stocks-with-discounts/solutions/7416718/1159ms-beats-3334-easy-approach-and-step-4ap1/?envType=daily-question&envId=2025-12-16
// For every employee u:
// - dp[u][0][b] → max profit using budget b, parent did NOT buy
// - dp[u][1][b] → max profit using budget b, parent DID buy
// At each node, consider two choices:
// 1. Skip buying stock
//    Spend 0 budget
//    Children do NOT get discount
//    Merge children using knapsack
// 2. Buy this stock
//    Spend present[u] or present[u]/2
//    Gain future[u] - cost
//    Children DO get discount
//    Merge children with discounted state

function maxProfit(
  n: number,
  present: number[],
  future: number[],
  hierarchy: number[][],
  budget: number,
): number {
  // Create a tree structure based on the hierarchy input
  const tree: number[][] = Array.from({ length: n }, () => []);
  for (const [u, v] of hierarchy) {
    tree[u - 1].push(v - 1);
  }

  // Initialize a 3D array to store the maximum profit for each employee
  const dp: number[][][] = Array.from({ length: n }, () =>
    Array.from({ length: 2 }, () => Array(budget + 1).fill(0)),
  );

  // This function merges the maximum profit from different sub-trees.
  //  * It takes two arrays of profits and returns a new array with the merged profits.
  const merge = (A: number[], B: number[]) => {
    const C: number[] = Array(budget + 1).fill(-1e9);
    for (let i = 0; i <= budget; i++) {
      if (A[i] < 0) continue;

      for (let j = 0; i + j <= budget; j++) {
        C[i + j] = Math.max(C[i + j], A[i] + B[j]);
      }
    }

    return C;
  };

  // perform dfs on tree structure, calculates the maximum profit for each employee
  // by considering two options: skipping buying the stock or buying the stock.
  const dfs = (u: number) => {
    // Traverse the children of the current employee
    for (const v of tree[u]) {
      dfs(v);
    }

    // Calculate the maximum profit for the current employee
    for (let parentBought = 0; parentBought <= 1; parentBought++) {
      const price = parentBought ? Math.floor(present[u] / 2) : present[u];
      const profit = future[u] - price;

      // Calculate the maximum profit if the employee skips buying the stock
      let skip = Array(budget + 1).fill(0);
      for (const v of tree[u]) {
        skip = merge(skip, dp[v][0]);
      }

      // Calculate the maximum profit if the employee buys the stock
      let take = Array(budget + 1).fill(-1e9);
      if (price <= budget) {
        let base = Array(budget + 1).fill(0);
        for (const v of tree[u]) {
          // Merge the maximum profit from the child employees
          base = merge(base, dp[v][1]);
        }
        for (let b = price; b <= budget; b++) {
          // Calculate the maximum profit if the employee buys the stock at price b
          take[b] = base[b - price] + profit;
        }
      }

      // Update the maximum profit in the dp array
      for (let b = 0; b <= budget; b++) {
        dp[u][parentBought][b] = Math.max(skip[b], take[b]);
      }
    }
  };

  dfs(0); // Start the dfs from the CEO (employee 1)
  return Math.max(...dp[0][0]); // dp[0][0] is the maximum profit can be achieved by the root Employee 1, which is CEO
}
