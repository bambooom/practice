// https://leetcode.com/problems/find-score-of-an-array-after-marking-all-elements
// You are given an array nums consisting of positive integers.
// Starting with score = 0, apply the following algorithm:
// Choose the smallest integer of the array that is not marked. If there is a tie, choose the one with the smallest index.
// Add the value of the chosen integer to score.
// Mark the chosen element and its two adjacent elements if they exist.
// Repeat until all the array elements are marked.
// Return the score you get after applying the above algorithm.

// Example 1:

// Input: nums = [2,1,3,4,5,2]
// Output: 7
// Explanation: We mark the elements as follows:
// - 1 is the smallest unmarked element, so we mark it and its two adjacent elements: [2,1,3,4,5,2].
// - 2 is the smallest unmarked element, so we mark it and its left adjacent element: [2,1,3,4,5,2].
// - 4 is the only remaining unmarked element, so we mark it: [2,1,3,4,5,2].
// Our score is 1 + 2 + 4 = 7.
// Example 2:

// Input: nums = [2,3,5,1,3,2]
// Output: 5
// Explanation: We mark the elements as follows:
// - 1 is the smallest unmarked element, so we mark it and its two adjacent elements: [2,3,5,1,3,2].
// - 2 is the smallest unmarked element, since there are two of them, we choose the left-most one, so we mark the one at index 0 and its right adjacent element: [2,3,5,1,3,2].
// - 2 is the only remaining unmarked element, so we mark it: [2,3,5,1,3,2].
// Our score is 1 + 2 + 2 = 5.

//https://leetcode.com/problems/find-score-of-an-array-after-marking-all-elements/solutions/6141247/2593-find-score-of-an-array-after-marking-all-elements/
// faster, use less memory
function findScore(nums: number[]): number {
  let score = 0;
  const marked = new Set<number>();

  const sortedIndexes = Array.from(nums.keys()).sort((a, b) => {
    if (nums[a] === nums[b]) {
      return a - b;
    }
    return nums[a] - nums[b];
  });

  for (const index of sortedIndexes) {
    if (!marked.has(index)) {
      score += nums[index];

      marked.add(index);
      marked.add(index - 1);
      marked.add(index + 1);
    }
  }

  return score;
}

// https://leetcode.com/problems/find-score-of-an-array-after-marking-all-elements/solutions/3312436/ts-find-score-of-an-array-after-marking-all-elements/
// slower
function findScore2(nums: number[]): number {
  const markedIndexes: boolean[] = Array(nums.length).fill(false);

  const numIndexPairsSortedByNum: number[][] = nums
    .map((num, i) => [num, i])
    .sort((a, b) => a[0] - b[0]);

  let score = 0;
  for (const [num, i] of numIndexPairsSortedByNum) {
    if (markedIndexes[i]) continue;

    score += num;

    markedIndexes[i] = true;
    if (i > 0) markedIndexes[i - 1] = true;
    if (i + 1 < markedIndexes.length) markedIndexes[i + 1] = true;
  }

  return score;
}
