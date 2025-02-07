// https://leetcode.com/problems/find-the-number-of-distinct-colors-among-the-balls/
// You are given an integer limit and a 2D array queries of size n x 2.
// There are limit + 1 balls with distinct labels in the range [0, limit]. Initially, all balls are uncolored. For every query in queries that is of the form [x, y], you mark ball x with the color y. After each query, you need to find the number of distinct colors among the balls.
// Return an array result of length n, where result[i] denotes the number of distinct colors after ith query.
// Note that when answering a query, lack of a color will not be considered as a color.

// https://leetcode.com/problems/find-the-number-of-distinct-colors-among-the-balls/solutions/6388471/typescript-easy-to-understand-solution-with-two-hash-maps-beats-100-47-ms-90-mb/
function queryResults(limit: number, queries: number[][]): number[] {
  // declare hash map (key: index, value: color)
  const ballColors = new Map<number, number>();

  // declare hash map (key: color, value: count)
  const colorCount = new Map<number, number>();

  const res: number[] = [];

  for (const [index, newColor] of queries) {
    // handle old color
    if (ballColors.has(index)) {
      const oldColor = ballColors.get(index)!;
      // If identical, early return
      if (oldColor === newColor) {
        res.push(colorCount.size);
        continue;
      }
      // reduce old color count
      colorCount.set(oldColor, colorCount.get(oldColor)! - 1);

      // remove old color key if zero
      if (colorCount.get(oldColor)! === 0) {
        colorCount.delete(oldColor);
      }
    }

    // handle new color
    ballColors.set(index, newColor);
    colorCount.set(newColor, (colorCount.get(newColor) ?? 0) + 1);

    res.push(colorCount.size);
  }

  return res;
}
