// https://leetcode.com/problems/letter-tile-possibilities
// You have n  tiles, where each tile has one letter tiles[i] printed on it.
// Return the number of possible non-empty sequences of letters you can make using the letters printed on those tiles.

// Example 1:
// Input: tiles = "AAB"
// Output: 8
// Explanation: The possible sequences are "A", "B", "AA", "AB", "BA", "AAB", "ABA", "BAA".

// Example 2:
// Input: tiles = "AAABBC"
// Output: 188

// Example 3:
// Input: tiles = "V"
// Output: 1

// https://leetcode.com/problems/letter-tile-possibilities/solutions/835099/typescript-dfs-w-comments/
// slower
function numTilePossibilities(tiles: string): number {
  const set: Set<string> = new Set();

  const N = tiles.length; // count of tiles

  // cur: current sequence this iteration has,
  // left: characters left to draw from
  // count: characters taken so far
  const dfs = (cur: string, left: string[], count: number): void => {
    // base case: no more tiles to draw from
    if (count === N) {
      set.add(cur);
      return;
    }

    // no-choise (empty string) is also a choice
    dfs(cur, [...left], count + 1);

    // go through all tile possibilities to draw from
    for (let i = 0; i < left.length; i++) {
      // simulate taking this tile from set of possible tiles
      const newLeft = [...left];
      newLeft.splice(i, 1);

      // use this tile as our choice
      dfs(cur + left[i], newLeft, count + 1);
    }
  };

  // start recursion
  dfs('', [...tiles], 0);

  return set.size - 1; // -1 since our solution will have empty string, and thats not allowed
}

// better
// https://leetcode.com/problems/letter-tile-possibilities/solutions/6431223/my-solution-refactored/
// Since tiles may contain duplicate characters, we must avoid counting duplicate permutations. Instead of generating all permutations explicitly, we track the count of each letter and use backtracking to explore different sequences.
function numTilePossibilities2(tiles: string): number {
  const counts: number[] = new Array(26).fill(0);

  for (const tile of tiles) {
    counts[tile.charCodeAt(0) - 'A'.charCodeAt(0)]++;
  }

  const backtrack = (counts: number[]): number => {
    let total = 0;

    for (let i = 0; i < 26; i++) {
      if (counts[i] === 0) continue;

      total++; // Counting the current letter as a valid sequence
      counts[i]--; // Use the letter
      total += backtrack(counts); // Recurse with remaining letters
      counts[i]++; // Backtrack
    }

    return total;
  };

  return backtrack(counts);
}
