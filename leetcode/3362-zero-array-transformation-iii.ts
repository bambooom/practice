// https://leetcode.com/problems/zero-array-transformation-iii/description
// You are given an integer array nums of length n and a 2D array queries where queries[i] = [li, ri].
// Each queries[i] represents the following action on nums:
// Decrement the value at each index in the range [li, ri] in nums by at most 1.
// The amount by which the value is decremented can be chosen independently for each index.
// A Zero Array is an array with all its elements equal to 0.
// Return the maximum number of elements that can be removed from queries, such that nums can still be converted to a zero array using the remaining queries. If it is not possible to convert nums to a zero array, return -1.

// Example 1:
// Input: nums = [2,0,2], queries = [[0,2],[0,2],[1,1]]
// Output: 1
// Explanation:
// After removing queries[2], nums can still be converted to a zero array.
// Using queries[0], decrement nums[0] and nums[2] by 1 and nums[1] by 0.
// Using queries[1], decrement nums[0] and nums[2] by 1 and nums[1] by 0.

// Example 2:
// Input: nums = [1,1,1,1], queries = [[1,3],[0,2],[1,3],[1,2]]
// Output: 2
// Explanation:
// We can remove queries[2] and queries[3].

// Example 3:
// Input: nums = [1,2,3,4], queries = [[0,3]]
// Output: -1
// Explanation:
// nums cannot be converted to a zero array even after using all the queries.

// Editorial, greedy and Priority Queue

import { MaxPriorityQueue } from '@datastructures-js/priority-queue';

function maxRemoval(nums: number[], queries: number[][]): number {
  // Sort queries by their starting position for sequential processing
  queries.sort((a, b) => a[0] - b[0]);
  // Max heap to store the ending positions of queries
  const heap = new MaxPriorityQueue<number>();
  // Track cumulative decrements at each position and their boundaries
  const deltaArray: number[] = new Array(nums.length + 1).fill(0);
  // Track total decrements applied so far
  let operations = 0;

  for (let i = 0, j = 0; i < nums.length; i++) {
    // Apply cumulative decrements from previous positions
    // Adds the cumulative effect of previous decrements at the current position
    // This represents decrements from queries that were applied earlier
    operations += deltaArray[i];

    // Add all queries that start at current position to the heap
    while (j < queries.length && queries[j][0] === i) {
      heap.push(queries[j][1]); // Store only ending position in heap
      j++;
    }

    // While current element is not zeroed and we have available queries
    // Prioritizes queries with larger ending positions (greedy approach)
    while (operations < nums[i] && !heap.isEmpty() && heap.front() >= i) {
      operations++; // Apply one decrement
      deltaArray[heap.pop() + 1]--; // Mark the end of the range where this decrement applies
      // Updates delta array to track where the decrement effect ends
    }

    // If we can't zero the current element, conversion is impossible
    if (operations < nums[i]) {
      // If we've used all available queries but still can't zero the current element
      // return -1
      return -1;
    }
  }

  // Return number of queries that weren't used (can be removed)
  return heap.size();
}
