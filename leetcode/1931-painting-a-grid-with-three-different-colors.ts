//https://leetcode.com/problems/painting-a-grid-with-three-different-colors/
// You are given two integers m and n. Consider an m x n grid where each cell is initially white. You can paint each cell red, green, or blue. All cells must be painted.
// Return the number of ways to color the grid with no two adjacent cells having the same color. Since the answer can be very large, return it modulo 109 + 7.

// Example 1:
// Input: m = 1, n = 1
// Output: 3
// Explanation: The three possible colorings are shown in the image above.

// Example 2:
// Input: m = 1, n = 2
// Output: 6
// Explanation: The six possible colorings are shown in the image above.

// Example 3:
// Input: m = 5, n = 5
// Output: 580986

// Give up on this one, below is the editorial solution

// Intuition:
// First, use enumeration to find all valid coloring schemes for a single row.
// Then, use dynamic programming to calculate the number of ways to color the entire m×n grid.

// Given the three available colors, red, green, and blue, we can represent them as 0, 1, and 2. In this way, a coloring scheme corresponds to a ternary number of length m, with a decimal range of [0,3^m).
// Thus, we can enumerate all integers in the range [0,3^m), convert them into ternary strings of length m, and check whether any two adjacent digits are different.
// Next, we use dynamic programming to compute the total number of coloring schemes. Let f[i][mask] represent the number of ways to color rows 0 through i,
//  where the i-th row's coloring scheme corresponds to the ternary value mask. For the state transition, we consider all valid coloring schemes mask′ for the (i−1)-th row:

function colorTheGrid(m: number, n: number): number {
  const mod = 1000000007;
  // Hash mapping stores all valid coloration schemes for a single row that meet the requirements
  const valid = new Map<number, number[]>();

  // Enumerate masks that meet the requirements within the range [0, 3^m)
  const maskEnd = Math.pow(3, m);
  for (let mask = 0; mask < maskEnd; ++mask) {
    const color: number[] = [];
    let mm = mask;
    for (let i = 0; i < m; ++i) {
      color.push(mm % 3);
      mm = Math.floor(mm / 3);
    }
    let check = true;
    for (let i = 0; i < m - 1; ++i) {
      if (color[i] === color[i + 1]) {
        check = false;
        break;
      }
    }
    if (check) {
      valid.set(mask, color);
    }
  }

  // Preprocess all (mask1, mask2) binary tuples, satisfying mask1 and mask2 When adjacent rows, the colors of the two cells in the same column are different
  const adjacent = new Map<number, number[]>();
  for (const [mask1, color1] of valid.entries()) {
    for (const [mask2, color2] of valid.entries()) {
      let check = true;
      for (let i = 0; i < m; ++i) {
        if (color1[i] === color2[i]) {
          check = false;
          break;
        }
      }
      if (check) {
        if (!adjacent.has(mask1)) {
          adjacent.set(mask1, []);
        }
        adjacent.get(mask1)!.push(mask2);
      }
    }
  }

  let f = new Map<number, number>();
  for (const [mask, _] of valid.entries()) {
    f.set(mask, 1);
  }
  for (let i = 1; i < n; ++i) {
    const g = new Map<number, number>();
    for (const [mask2, _] of valid.entries()) {
      for (const mask1 of adjacent.get(mask2) || []) {
        g.set(mask2, ((g.get(mask2) || 0) + f.get(mask1)!) % mod);
      }
    }
    f = g;
  }

  let ans = 0;
  for (const num of f.values()) {
    ans = (ans + num) % mod;
  }
  return ans;
}
