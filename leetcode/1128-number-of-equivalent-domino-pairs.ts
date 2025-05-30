// https://leetcode.com/problems/number-of-equivalent-domino-pairs
// Given a list of dominoes, dominoes[i] = [a, b] is equivalent to dominoes[j] = [c, d] if and only if either (a == c and b == d), or (a == d and b == c) - that is, one domino can be rotated to be equal to another domino.
// Return the number of pairs (i, j) for which 0 <= i < j < dominoes.length, and dominoes[i] is equivalent to dominoes[j].

// Example 1:
// Input: dominoes = [[1,2],[2,1],[3,4],[5,6]]
// Output: 1

// Example 2:
// Input: dominoes = [[1,2],[1,2],[1,1],[1,2],[2,2]]
// Output: 3

function numEquivDominoPairs(dominoes: number[][]): number {
  const map = new Map<string, number>();
  let count = 0;
  for (const domino of dominoes) {
    const key =
      domino[0] < domino[1] ? domino.join('') : domino.reverse().join('');
    count += map.get(key) || 0;
    map.set(key, (map.get(key) || 0) + 1);
  }
  return count;
}
