// https://leetcode.com/problems/maximum-square-area-by-removing-fences-from-a-field/
// There is a large (m - 1) x (n - 1) rectangular field with corners at (1, 1) and (m, n) containing some horizontal and vertical fences given in arrays hFences and vFences respectively.
// Horizontal fences are from the coordinates (hFences[i], 1) to (hFences[i], n) and vertical fences are from the coordinates (1, vFences[i]) to (m, vFences[i]).
// Return the maximum area of a square field that can be formed by removing some fences (possibly none) or -1 if it is impossible to make a square field.
// Since the answer may be large, return it modulo 10^9 + 7.
// Note: The field is surrounded by two horizontal fences from the coordinates (1, 1) to (1, n) and (m, 1) to (m, n) and two vertical fences from the coordinates (1, 1) to (m, 1) and (1, n) to (m, n). These fences cannot be removed.

// Example 1:
// Input: m = 4, n = 3, hFences = [2,3], vFences = [2]
// Output: 4
// Explanation: Removing the horizontal fence at 2 and the vertical fence at 2 will give a square field of area 4.

// Example 2:
// Input: m = 6, n = 7, hFences = [2], vFences = [4]
// Output: -1
// Explanation: It can be proved that there is no way to create a square field by removing fences.

// Constraints:
// 3 <= m, n <= 10^9
// 1 <= hFences.length, vFences.length <= 600
// 1 < hFences[i] < m
// 1 < vFences[i] < n
// hFences and vFences are unique.

function maximizeSquareArea(
  m: number,
  n: number,
  hFences: number[],
  vFences: number[],
): number {
  const MOD = 1000000007n;

  // Helper function to prepare an array by sorting its elements in ascending order
  // and adding a limit value at the end.
  const prep = (cuts: number[], limit: number) => [
    1,
    ...cuts.sort((a, b) => a - b),
    limit,
  ];

  const h = prep(hFences, m);
  const v = prep(vFences, n);

  // Initialize a set to store the differences between adjacent elements in the `h` array
  const gapSet = new Set<number>();

  // Calculate the differences between adjacent elements in the `h` array and add them to the `gapSet`
  for (let i = 0; i < h.length; i++) {
    for (let j = i + 1; j < h.length; j++) {
      gapSet.add(h[j] - h[i]);
    }
  }

  let best = 0; // store the maximum difference found

  // Find the maximum difference between adjacent elements in the `v` array that is also present in the `gapSet`
  for (let i = 0; i < v.length; i++) {
    for (let j = i + 1; j < v.length; j++) {
      const d = v[j] - v[i];
      if (d > best && gapSet.has(d)) {
        best = d;
      }
    }
  }

  // Check if no square can be formed
  if (best === 0) {
    return -1;
  }

  // Calculate the square of `best` using BigInts to avoid overflow// Calculate the square of `best` using BigInts to avoid overflow
  const ans = (BigInt(best) * BigInt(best)) % MOD;

  return Number(ans);
}
