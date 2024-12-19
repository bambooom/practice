// https://leetcode.com/problems/max-chunks-to-make-sorted

// You are given an integer array arr of length n that represents a permutation of the integers in the range [0, n - 1].
// We split arr into some number of chunks (i.e., partitions), and individually sort each chunk. After concatenating them, the result should equal the sorted array.
// Return the largest number of chunks we can make to sort the array.

// Example 1:
// Input: arr = [4,3,2,1,0]
// Output: 1
// Explanation:
// Splitting into two or more chunks will not return the required result.
// For example, splitting into [4, 3], [2, 1, 0] will result in [3, 4, 0, 1, 2], which isn't sorted.

// Example 2:
// Input: arr = [1,0,2,3,4]
// Output: 4
// Explanation:
// We can split into two chunks, such as [1, 0], [2, 3, 4].
// However, splitting into [1, 0], [2], [3], [4] is the highest number of chunks possible.

// https://leetcode.com/problems/max-chunks-to-make-sorted/solutions/6161855/postfixmin-o-n-time-o-n-space/
// Use a postFixSum of the minimum from [i, arr.length - 1].
// From range [i, j], if the max is lower than the min of [j + 1, k], then we can split those in two chunks.
// So the postFixMin is essentially to determine that min from [j + 1, k].
function maxChunksToSorted(arr: number[]): number {
  const postFixMin = new Array(arr.length); // calc max num, from index i - arr.length - 1
  let curMin = arr[arr.length - 1];
  let chunks = 1;

  for (let i = arr.length - 1; i >= 0; i--) {
    curMin = Math.min(curMin, arr[i]);
    postFixMin[i] = curMin;
  }

  // we cannot split a chunk from [i, j] if there exists a num smaller than the max from i, j in [j + 1, arr.length - 1]
  let chunkMax = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (chunkMax < postFixMin[i]) {
      chunks++;
    }

    chunkMax = Math.max(chunkMax, arr[i]);
  }

  return chunks;
}

// https://leetcode.com/problems/max-chunks-to-make-sorted/solutions/6161704/simplifying-array-sorting-with-explanation-beats100/
function maxChunksToSorted2(arr: number[]): number {
  let max = 0; // This represents the largest element seen so far, helping us identify when a chunk boundary can be formed.
  let ans = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
    if (max === i) {
      // implies that all elements from the start of the current chunk up to i are in their correct positions (relative to the sorted array). At this point, increment the chunk count (ans).
      ans++;
    }
  }
  return ans;
}
