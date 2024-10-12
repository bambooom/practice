// https://leetcode.com/problems/divide-intervals-into-minimum-number-of-groups
// You are given a 2D integer array intervals where intervals[i] = [lefti, righti] represents the inclusive interval [lefti, righti].
// You have to divide the intervals into one or more groups such that each interval is in exactly one group, and no two intervals that are in the same group intersect each other.
// Return the minimum number of groups you need to make.
// Two intervals intersect if there is at least one common number between them. For example, the intervals [1, 5] and [5, 8] intersect.

// Example 1:
// Input: intervals = [[5,10],[6,8],[1,5],[2,3],[1,10]]
// Output: 3
// Explanation: We can divide the intervals into the following groups:
// - Group 1: [1, 5], [6, 8].
// - Group 2: [2, 3], [5, 10].
// - Group 3: [1, 10].
// It can be proven that it is not possible to divide the intervals into fewer than 3 groups.

// Example 2:
// Input: intervals = [[1,3],[5,6],[8,10],[11,13]]
// Output: 1
// Explanation: None of the intervals overlap, so we can put all of them in one group.

// https://leetcode.com/problems/divide-intervals-into-minimum-number-of-groups/solutions/5901143/step-by-step-guide-to-minimizing-interval-groups/
// sort the intervals by their start times to process them in chronological order
// use a priority queue(min-heap) to track the end times of the intervals
// if the start time of the new interval is greater than the earlist end time in the heap, this means the interval can be placed in existing group. So we remove the top of the heap and replace it with the new interval's end time
// if the start time of the new interval is earlier than all end times in the heap, it means we need a new group, and we add the new end time to the heap
function minGroups(intervals: number[][]): number {
  const events: number[][] = [];
  for (const [start, end] of intervals) {
    events.push([start, 1]);
    events.push([end + 1, -1]);
  }
  events.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));
  let maxGroups = 0;
  let currentGroups = 0;

  for (const [time, type] of events) {
    currentGroups += type;
    maxGroups = Math.max(maxGroups, currentGroups);
  }

  return maxGroups;
}

// https://leetcode.com/problems/divide-intervals-into-minimum-number-of-groups/solutions/2560339/javascript-similar-to-lc253-meeting-rooms-sort-start-and-end-time/
// seems faster
function minGroups2(intervals: number[][]): number {
  const starts = intervals.map((intv) => intv[0]).sort((a, b) => a - b);
  const ends = intervals.map((intv) => intv[1]).sort((a, b) => a - b);

  let maxGroups = 0;
  let endIdx = 0;

  for (let i = 0; i < starts.length; i++) {
    if (starts[i] <= ends[endIdx]) {
      maxGroups++;
    } else {
      endIdx--;
    }
  }

  return maxGroups;
}
