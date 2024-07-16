// https://leetcode.com/problems/paint-fence
// You are painting a fence of n posts with k different colors. You must paint the posts following these rules:

// Every post must be painted exactly one color.
// There cannot be three or more consecutive posts with the same color.
// Given the two integers n and k, return the number of ways you can paint the fence.

// https://leetcode.com/problems/paint-fence/solutions/4711484/simple-swapping-technique/?envType=study-plan-v2&envId=premium-algo-100
// swapping technique
function numWays(n: number, k: number): number {
  if (n === 0) return 0;
  if (n === 1) return k;

  let same = k; // ways to paint the second post with the same color as the first
  let diff = k * (k - 1); // ways to paint the second post with a different color

  for (let i = 3; i <= n; i++) {
    // for the i-th post, calculate new same and diff
    const temp = diff;
    // if the current post is the same color as the prev one, the prev two must be different
    diff = (same + diff) * (k - 1);
    // if the current post is different from the prev one, the prev one can be same or diff
    same = temp;
  }

  // the total number of ways will be the sum of same and diff for the last post
  return same + diff;
}
