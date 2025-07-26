// https://leetcode.com/problems/maximize-subarrays-after-removing-one-conflicting-pair
// You are given an integer n which represents an array nums containing the numbers from 1 to n in order. Additionally, you are given a 2D array conflictingPairs, where conflictingPairs[i] = [a, b] indicates that a and b form a conflicting pair.
// Remove exactly one element from conflictingPairs. Afterward, count the number of non-empty subarrays of nums which do not contain both a and b for any remaining conflicting pair [a, b].
// Return the maximum number of subarrays possible after removing exactly one conflicting pair.

// Example 1:
// Input: n = 4, conflictingPairs = [[2,3],[1,4]]
// Output: 9
// Explanation:
// Remove [2, 3] from conflictingPairs. Now, conflictingPairs = [[1, 4]].
// There are 9 subarrays in nums where [1, 4] do not appear together. They are [1], [2], [3], [4], [1, 2], [2, 3], [3, 4], [1, 2, 3] and [2, 3, 4].
// The maximum number of subarrays we can achieve after removing one element from conflictingPairs is 9.

// Example 2:
// Input: n = 5, conflictingPairs = [[1,2],[2,5],[3,5]]
// Output: 12
// Explanation:
// Remove [1, 2] from conflictingPairs. Now, conflictingPairs = [[2, 5], [3, 5]].
// There are 12 subarrays in nums where [2, 5] and [3, 5] do not appear together.
// The maximum number of subarrays we can achieve after removing one element from conflictingPairs is 12.

// https://leetcode.com/problems/maximize-subarrays-after-removing-one-conflicting-pair/solutions/6567872/optimal-solution-tc-o-n-sc-o-n/?envType=daily-question&envId=2025-07-26
function maxSubarrays(n: number, conflictingPairs: number[][]): number {
  // array to store conflicting pairs for each index
  const right: number[][] = Array.from({ length: n + 1 }, () => []);

  // step1: build conflict list for each index
  for (const [a, b] of conflictingPairs) {
    // Store the smaller index in the right array of the larger index
    right[Math.max(a, b)].push(Math.min(a, b));
  }

  let ans = 0;
  let left: [number, number] = [0, 0]; // [primary left, secondary left]
  const bonus: number[] = Array(n + 1).fill(0); // keeps track of the arrays we can add if we remove that condition from given list.
  // bonus account for the additional subarrays that can be formed when a conflicting pair is removed

  // This is evaluating 3 candidate pairs and returning the one that is maximum in lexicographical order
  // find maximu pair in lexicographical order
  function maxPair(...pairs: [number, number][]): [number, number] {
    return pairs.reduce((max: [number, number], curr: [number, number]) => {
      // Compare pairs based on the first element, then the second element
      if (curr[0] > max[0] || (curr[0] === max[0] && curr[1] > max[1])) {
        return curr;
      }
      return max;
    }, pairs[0]);
  }

  // Iterate over from 1 to n
  for (let r = 1; r <= n; r++) {
    // Iterate over each conflicting pair for the current index
    for (const l of right[r]) {
      // Update the left variables to store the maximum pair
      left = maxPair(left, [l, left[0]], [left[0], l]);
    }

    // Update the answer by adding the difference between the current index and the primary left index
    ans += r - left[0];
    // Update the bonus array by adding the difference between the primary left index and the secondary left index
    bonus[left[0]] += left[0] - left[1];
  }
  // Return the maximum answer by adding the maximum bonus value
  return ans + Math.max(...bonus);
}

// Editorial
function maxSubarrays2(n: number, conflictingPairs: number[][]): number {
  const bMin1 = Array(n + 1).fill(Number.MAX_SAFE_INTEGER);
  const bMin2 = Array(n + 1).fill(Number.MAX_SAFE_INTEGER);
  for (const pair of conflictingPairs) {
    const a = Math.min(pair[0], pair[1]),
      b = Math.max(pair[0], pair[1]);
    if (bMin1[a] > b) {
      bMin2[a] = bMin1[a];
      bMin1[a] = b;
    } else if (bMin2[a] > b) {
      bMin2[a] = b;
    }
  }
  let res = 0,
    ib1 = n,
    b2 = Number.MAX_SAFE_INTEGER;
  const delCount = Array(n + 1).fill(0);
  for (let i = n; i >= 1; i--) {
    if (bMin1[ib1] > bMin1[i]) {
      b2 = Math.min(b2, bMin1[ib1]);
      ib1 = i;
    } else {
      b2 = Math.min(b2, bMin1[i]);
    }
    res += Math.min(bMin1[ib1], n + 1) - i;
    delCount[ib1] +=
      Math.min(Math.min(b2, bMin2[ib1]), n + 1) - Math.min(bMin1[ib1], n + 1);
  }
  return res + Math.max(...delCount);
}
