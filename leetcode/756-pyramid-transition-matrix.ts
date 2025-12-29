// https://leetcode.com/problems/pyramid-transition-matrix/
// You are stacking blocks to form a pyramid. Each block has a color, which is represented by a single letter. Each row of blocks contains one less block than the row beneath it and is centered on top.
// To make the pyramid aesthetically pleasing, there are only specific triangular patterns that are allowed. A triangular pattern consists of a single block stacked on top of two blocks. The patterns are given as a list of three-letter strings allowed, where the first two characters of a pattern represent the left and right bottom blocks respectively, and the third character is the top block.
// For example, "ABC" represents a triangular pattern with a 'C' block stacked on top of an 'A' (left) and 'B' (right) block. Note that this is different from "BAC" where 'B' is on the left bottom and 'A' is on the right bottom.
// You start with a bottom row of blocks bottom, given as a single string, that you must use as the base of the pyramid.
// Given bottom and allowed, return true if you can build the pyramid all the way to the top such that every triangular pattern in the pyramid is in allowed, or false otherwise.

// Example 1:
// Input: bottom = "BCD", allowed = ["BCC","CDE","CEA","FFF"]
// Output: true
// Explanation: The allowed triangular patterns are shown on the right.
// Starting from the bottom (level 3), we can build "CE" on level 2 and then build "A" on level 1.
// There are three triangular patterns in the pyramid, which are "BCC", "CDE", and "CEA". All are allowed.

// Example 2:
// Input: bottom = "AAAA", allowed = ["AAB","AAC","BCD","BBE","DEF"]
// Output: false
// Explanation: The allowed triangular patterns are shown on the right.
// Starting from the bottom (level 4), there are multiple ways to build level 3, but trying all the possibilites, you will get always stuck before building level 1.

// Constraints:
// 2 <= bottom.length <= 6
// 0 <= allowed.length <= 216
// allowed[i].length == 3
// The letters in all input strings are from the set {'A', 'B', 'C', 'D', 'E', 'F'}.
// All the values of allowed are unique.

// https://leetcode.com/problems/pyramid-transition-matrix/solutions/5283465/easy-to-understand-dfs-caching-by-samson-5vjn/?envType=daily-question&envId=2025-12-29
function pyramidTransition(bottom: string, allowed: string[]): boolean {
  // cache to hold all apex of allowed pairs
  // eg: allowed pairs, <'AB', ['C', 'D', 'E']>
  const cache = new Map<string, string[]>();

  const dfs = (currentRow: string): boolean => {
    // base case: if we reach the top, we're done
    if (currentRow.length === 1) {
      return true;
    }

    let possibleNextRows: string[] = [];

    for (let i = 1; i < currentRow.length; i++) {
      const pair = currentRow.slice(i - 1, i + 1);
      const matchingPairs: string[] = [];

      // use cache if already indexed, else do matching the cache it
      const cachedMatchingPairs = cache.get(pair);
      if (cachedMatchingPairs) {
        matchingPairs.push(...cachedMatchingPairs);
      } else {
        matchingPairs.push(
          ...allowed
            .filter((pattern) => pattern.startsWith(pair))
            .map((pattern) => pattern.slice(-1)),
        );
        cache.set(pair, matchingPairs);
      }

      // No matching pair = cannot build upwards, return false
      if (matchingPairs.length <= 0) {
        return false;
      }

      // then calculate & update possible next rows

      // if possibleNextRows is empty, initiate with matchingPairs
      if (possibleNextRows.length <= 0) {
        possibleNextRows = matchingPairs;
        continue;
      }
      // else, calculate and store all permutations
      const updatedNextRows: string[] = [];
      for (const nextRow of possibleNextRows) {
        for (const pair of matchingPairs) {
          updatedNextRows.push(nextRow.concat(pair));
        }
      }
      possibleNextRows = updatedNextRows;
    }

    for (const nextRow of possibleNextRows) {
      // when anyone of next row works, we're done
      if (dfs(nextRow)) {
        return true;
      }
    }

    return false;
  };

  return dfs(bottom);
}
