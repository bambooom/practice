// https://leetcode.com/problems/non-overlapping-intervals/
// #dynamic programming, #greedy
// Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.

function eraseOverlapIntervals(intervals: number[][]): number {
  // sort by earliest finish time
  intervals.sort((a, b) => a[1] - b[1]);
  let prev = intervals[0];
  let remove = 0;

  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < prev[1]) {
      remove++;
    } else {
      prev = intervals[i];
    }
  }

  return remove;
}
