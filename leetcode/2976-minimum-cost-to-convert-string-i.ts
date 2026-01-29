// https://leetcode.com/problems/minimum-cost-to-convert-string-i/
// You are given two 0-indexed strings source and target, both of length n and consisting of lowercase English letters. You are also given two 0-indexed character arrays original and changed, and an integer array cost, where cost[i] represents the cost of changing the character original[i] to the character changed[i].
// You start with the string source. In one operation, you can pick a character x from the string and change it to the character y at a cost of z if there exists any index j such that cost[j] == z, original[j] == x, and changed[j] == y.
// Return the minimum cost to convert the string source to the string target using any number of operations. If it is impossible to convert source to target, return -1.
// Note that there may exist indices i, j such that original[j] == original[i] and changed[j] == changed[i].

// Example 1:
// Input: source = "abcd", target = "acbe", original = ["a","b","c","c","e","d"], changed = ["b","c","b","e","b","e"], cost = [2,5,5,1,2,20]
// Output: 28
// Explanation: To convert the string "abcd" to string "acbe":
// - Change value at index 1 from 'b' to 'c' at a cost of 5.
// - Change value at index 2 from 'c' to 'e' at a cost of 1.
// - Change value at index 2 from 'e' to 'b' at a cost of 2.
// - Change value at index 3 from 'd' to 'e' at a cost of 20.
// The total cost incurred is 5 + 1 + 2 + 20 = 28.
// It can be shown that this is the minimum possible cost.

// Example 2:
// Input: source = "aaaa", target = "bbbb", original = ["a","c"], changed = ["c","b"], cost = [1,2]
// Output: 12
// Explanation: To change the character 'a' to 'b' change the character 'a' to 'c' at a cost of 1, followed by changing the character 'c' to 'b' at a cost of 2, for a total cost of 1 + 2 = 3. To change all occurrences of 'a' to 'b', a total cost of 3 * 4 = 12 is incurred.

// Example 3:
// Input: source = "abcd", target = "abce", original = ["a"], changed = ["e"], cost = [10000]
// Output: -1
// Explanation: It is impossible to convert source to target because the value at index 3 cannot be changed from 'd' to 'e'.

// shorted-path
// https://leetcode.com/problems/minimum-cost-to-convert-string-i/solutions/5542944/100-run-time-solution-with-java-javascript-typescript/?envType=daily-question&envId=2024-07-27
function minimumCostI(
  source: string,
  target: string,
  original: string[],
  changed: string[],
  cost: number[],
): number {
  const ALPHABET_SIZE = 26;
  const INF = Infinity;

  // initialize distance matrix: Create a matrix to represent the cost of transforming each letter to every other letter, starting with infinite costs except for zero cost from a letter to itself.
  const dist: number[][] = Array.from({ length: ALPHABET_SIZE }, () =>
    Array(ALPHABET_SIZE).fill(INF),
  );
  // Set the diagonal elements of the distance matrix to zero, as the cost of transforming a letter to itself is zero.
  for (let i = 0; i < ALPHABET_SIZE; i++) {
    dist[i][i] = 0;
  }

  // Populate Transformation Costs: Update the matrix with the given direct transformation costs.
  for (let i = 0; i < original.length; i++) {
    const from = original[i].charCodeAt(0) - 'a'.charCodeAt(0);
    const to = changed[i].charCodeAt(0) - 'a'.charCodeAt(0);
    dist[from][to] = Math.min(dist[from][to], cost[i]);
  }

  // Floyd-Warshall Algorithm is a graph algorithm used to find the shortest paths between all pairs of vertices in a weighted graph
  // The algorithm works by iteratively improving the estimates of the shortest path between all pairs of vertices. It starts with the direct costs (single-step paths) and then considers all possible intermediate vertices to refine the path lengths.
  // Apply Floyd-Warshall Algorithm: Compute the shortest paths between all pairs of letters to find the minimum transformation costs.
  for (let k = 0; k < ALPHABET_SIZE; k++) {
    for (let i = 0; i < ALPHABET_SIZE; i++) {
      for (let j = 0; j < ALPHABET_SIZE; j++) {
        if (dist[i][k] < INF && dist[k][j] < INF) {
          dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
        }
      }
    }
  }

  // Calculate Total Cost: Sum the minimum costs for transforming each character in the source string to the corresponding character in the target string. Return -1 if any transformation is impossible
  let totalCost = 0;
  for (let i = 0; i < source.length; i++) {
    const srcChar = source[i].charCodeAt(0) - 'a'.charCodeAt(0);
    const tgtChar = target[i].charCodeAt(0) - 'a'.charCodeAt(0);

    // If the transformation is impossible, return -1.
    if (dist[srcChar][tgtChar] === INF) {
      return -1;
    }

    // Add the minimum cost to the total cost.
    totalCost += dist[srcChar][tgtChar];
  }

  return totalCost;
}
