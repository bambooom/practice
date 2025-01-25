// https://leetcode.com/problems/make-lexicographically-smallest-array-by-swapping-elements
// You are given a 0-indexed array of positive integers nums and a positive integer limit.
// In one operation, you can choose any two indices i and j and swap nums[i] and nums[j] if |nums[i] - nums[j]| <= limit.
// Return the lexicographically smallest array that can be obtained by performing the operation any number of times.
// An array a is lexicographically smaller than an array b if in the first position where a and b differ, array a has an element that is less than the corresponding element in b. For example, the array [2,10,3] is lexicographically smaller than the array [10,2,3] because they differ at index 0 and 2 < 10.

// Example 1:
// Input: nums = [1,5,3,9,8], limit = 2
// Output: [1,3,5,8,9]
// Explanation: Apply the operation 2 times:
// - Swap nums[1] with nums[2]. The array becomes [1,3,5,9,8]
// - Swap nums[3] with nums[4]. The array becomes [1,3,5,8,9]
// We cannot obtain a lexicographically smaller array by applying any more operations.
// Note that it may be possible to get the same result by doing different operations.

// Example 2:
// Input: nums = [1,7,6,18,2,1], limit = 3
// Output: [1,6,7,18,1,2]
// Explanation: Apply the operation 3 times:
// - Swap nums[1] with nums[2]. The array becomes [1,6,7,18,2,1]
// - Swap nums[0] with nums[4]. The array becomes [2,6,7,18,1,1]
// - Swap nums[0] with nums[5]. The array becomes [1,6,7,18,1,2]
// We cannot obtain a lexicographically smaller array by applying any more operations.

// Example 3:
// Input: nums = [1,7,28,19,10], limit = 3
// Output: [1,7,28,19,10]
// Explanation: [1,7,28,19,10] is the lexicographically smallest array we can obtain because we cannot apply the operation on any two indices.

// https://leetcode.com/problems/make-lexicographically-smallest-array-by-swapping-elements/solutions/6325995/solution-with-explanation-beats-60-80-in-time-and-space/?envType=daily-question&envId=2025-01-25
// The optimal solution would arrange the array in ascending order. However, due to the limit constraint, only certain elements can be swapped. This means we need to identify groups of elements that can be sorted independently within the limit and then write them back to their respective positions.
function lexicographicallySmallestArray(
  nums: number[],
  limit: number,
): number[] {
  const n = nums.length;

  // create an array of indices and sort them by their corresponding values in nums
  const sortedIndices: number[] = Array.from({ length: n }, (_, i) => i);
  sortedIndices.sort((a, b) => nums[a] - nums[b]);

  const res: number[] = Array(n).fill(0);

  // process each group of indices with values within the "limit" difference
  let groupStart = 0;
  while (groupStart < n) {
    let groupEnd = groupStart + 1;

    // expand the group while the difference between consecutive values is <= limit
    while (
      groupEnd < n &&
      nums[sortedIndices[groupEnd]] - nums[sortedIndices[groupEnd - 1]] <= limit
    ) {
      groupEnd++;
    }

    // extract and sort the current group of indices
    const groupIndices = sortedIndices
      .slice(groupStart, groupEnd)
      .sort((a, b) => a - b);

    // sort the values of the group and place them into the result array
    const sortedValues = groupIndices.map((i) => nums[i]).sort((a, b) => a - b);

    // write the sorted values back to the result array
    for (let i = 0; i < groupIndices.length; i++) {
      res[groupIndices[i]] = sortedValues[i];
    }

    // move to the next group
    groupStart = groupEnd;
  }

  return res;
}
