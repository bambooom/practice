// https://leetcode.com/problems/maximum-candies-allocated-to-k-children/
// You are given a 0-indexed integer array candies. Each element in the array denotes a pile of candies of size candies[i]. You can divide each pile into any number of sub piles, but you cannot merge two piles together.
// You are also given an integer k. You should allocate piles of candies to k children such that each child gets the same number of candies. Each child can be allocated candies from only one pile of candies and some piles of candies may go unused.
// Return the maximum number of candies each child can get.

// Example 1:
// Input: candies = [5,8,6], k = 3
// Output: 5
// Explanation: We can divide candies[1] into 2 piles of size 5 and 3, and candies[2] into 2 piles of size 5 and 1. We now have five piles of candies of sizes 5, 5, 3, 5, and 1. We can allocate the 3 piles of size 5 to 3 children. It can be proven that each child cannot receive more than 5 candies.

// Example 2:
// Input: candies = [2,5], k = 11
// Output: 0
// Explanation: There are 11 children but only 7 candies in total, so it is impossible to ensure each child receives at least one candy. Thus, each child gets no candy and the answer is 0.

// Our goal is to find the greatest number of candies each child can get
// Each child must get the same number of candies.
// Each child's candies must come from just one pile. We can divide candies from a pile among multiple children, but we cannot combine candies from different piles for one child.

// binary search
function maximumCandies(candies: number[], k: number): number {
  if (k === 0) return 0;

  let left = 1;
  let right = Math.max(...candies); // the maximum number of candies, cannot merge candies, so it's the upper bound

  let result = 0;

  // Additionally, note that if a valid distribution exists for a given number x, then a distribution is also possible for any number smaller than or equal to x
  // Conversely, if we cannot allocate the candies such that each child receives x candies, then it's impossible to distribute them in a way that gives each child more than x candies.
  // It's a monotonic property
  const canDistribute = (candies: number[], k: number, x: number): boolean => {
    let count = 0;
    for (const pile of candies) {
      count += Math.floor(pile / x); // each pile can serve up to `Math.floor(pile / x)` children
    }

    return count >= k;
  };

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (canDistribute(candies, k, mid)) {
      result = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
}
