// https://leetcode.com/problems/merge-intervals/

// Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
// Output: [[1,6],[8,10],[15,18]]
// Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].

// First, we sort the list as described.
// Then, we insert the first interval into our merged list and continue considering each interval in turn as follows:
// If the current interval begins after the previous interval ends,
// then they do not overlap and we can append the current interval to merged.Otherwise,
// they do overlap, and we merge them by updating the end of the previous interval if it is less than the end of the current interval.

function merge(intervals: number[][]): number[][] {
  intervals.sort((a, b) => a[0] - b[0]); // sort by first number in interval
  const merged: number[][] = [];

  for (let i = 0; i < intervals.length; i++) {
    const interval = intervals[i];
    if (!merged.length || merged[merged.length - 1][1] < interval[0]) {
      // if max is smaller then current interval low bound, then push the interval directly
      merged.push(interval);
    } else {
      // has overlapped, update last merged interval's upper bound
      merged[merged.length - 1][1] = Math.max(
        merged[merged.length - 1][1],
        interval[1],
      );
    }
  }

  return merged;
}
