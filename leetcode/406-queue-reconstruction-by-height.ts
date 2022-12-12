// https://leetcode.com/problems/queue-reconstruction-by-height/

/**
 * Algorithm

- Sort people:
  In the descending order by height.
  Among the guys of the same height, in the ascending order by k-values.
- Take guys one by one, and place them in the output array at the indexes equal to their k-values.
- Return output array.

Time O(N^2)
Space O(1)
 */

function reconstructQueue(people: number[][]): number[][] {
  people.sort(([h1, k1], [h2, k2]) => (h1 === h2 ? k1 - k2 : h2 - h1));
  const output: number[][] = [];
  for (const p of people) {
    output.splice(p[1], 0, p);
  }
  return output;
}
