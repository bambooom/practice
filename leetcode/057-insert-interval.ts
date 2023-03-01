// https://leetcode.com/problems/insert-interval/

// Input: intervals = [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], newInterval = [4, 8]
// Output: [[1,2],[3,10],[12,16]]
// Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].

function insert(intervals: number[][], newInterval: number[]): number[][] {
  // const [start, end] = newInterval;
  // if (intervals.length === 0) {
  //   return [newInterval];
  // }
  // for (let i = 0; i < intervals.length; i++) {
  //   const [s, e] = intervals[i];
  //   if (start > e) continue;
  //   if (start >= s && end <= e) {
  //     return intervals; // no need to insert new
  //   }
  //   if (i < intervals.length - 1) {
  //     const [ns, ne] = intervals;
  //   }
  // }

  let [start, end] = newInterval;
  const left = [];
  const right = [];

  for (const interval of intervals) {
    const [first, last] = interval;

    // current interval is smaller than newInterval
    if (last < start) left.push(interval);
    // current interval is larger than newInterval
    else if (first > end) right.push(interval);
    // there is a overlap
    else {
      start = Math.min(start, first);
      end = Math.max(end, last);
    }
  }

  return [...left, [start, end], ...right];
}

function insert2(intervals: number[][], newInterval: number[]): number[][] {
  const result = [];

  for (let i = 0; i < intervals.length; i++) {
    const interval = intervals[i];

    // If overlaps
    if (
      Math.max(interval[0], newInterval[0]) <=
      Math.min(interval[1], newInterval[1])
    ) {
      newInterval = [
        Math.min(interval[0], newInterval[0]),
        Math.max(interval[1], newInterval[1]),
      ];
      continue;
    }

    // If lower
    if (interval[0] > newInterval[1]) {
      result.push(newInterval, ...intervals.slice(i));
      return result;
    }

    result.push(interval);
  }

  result.push(newInterval);
  return result;
}
