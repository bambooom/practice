// https://leetcode.com/problems/paint-house
// There is a row of n houses, where each house can be painted one of three colors: red, blue, or green. The cost of painting each house with a certain color is different. You have to paint all the houses such that no two adjacent houses have the same color.
// The cost of painting each house with a certain color is represented by an n x 3 cost matrix costs.
// For example, costs[0][0] is the cost of painting house 0 with the color red; costs[1][2] is the cost of painting house 1 with color green, and so on...
// Return the minimum cost to paint all houses.

// Example 1:
// Input: costs = [[17,2,17],[16,16,5],[14,3,19]]
// Output: 10
// Explanation: Paint house 0 into blue, paint house 1 into green, paint house 2 into blue.
// Minimum cost: 2 + 5 + 3 = 10.
// Example 2:
// Input: costs = [[7,6,2]]
// Output: 2

// dynamic programming
function minCost(costs: number[][]): number {
  if (costs.length === 1) {
    return Math.min(costs[0][0], costs[0][1], costs[0][2]);
  }

  const prevCost = [...costs[0]];

  for (let i = 1; i < costs.length; i++) {
    const [red, blue, green] = costs[i];
    const [oldRed, oldBlue, oldGreen] = prevCost; // current cost

    // 6 situations to choose as we can't choose the same color
    // cause we choose red as new result
    // [newRed + oldBlue, oldBlue, oldGreen]
    // [newRed + oldGreen, oldBlue, oldGreen]

    // cause we choose blue as new result
    // [oldRed, oldRed + newBlue, oldGreen]
    // [oldRed, oldGreen + newBlue, oldGreen]

    // cause we choose green as new result
    // [oldRed, oldBlue, oldRed + newGreen]
    // [oldRed, oldBlue, oldBlue + newGreen]

    // simplified as:
    const minR = Math.min(oldBlue + red, oldGreen + red);
    const minB = Math.min(oldRed + blue, oldGreen + blue);
    const minG = Math.min(oldRed + green, oldBlue + green);

    prevCost[0] = minR;
    prevCost[1] = minB;
    prevCost[2] = minG;
  }

  const [r, g, b] = prevCost;
  return Math.min(r, g, b);
}
