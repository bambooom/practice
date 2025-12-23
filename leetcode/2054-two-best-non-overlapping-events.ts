// https://leetcode.com/problems/two-best-non-overlapping-events
// You are given a 0-indexed 2D integer array of events where events[i] = [startTimei, endTimei, valuei]. The ith event starts at startTimei and ends at endTimei, and if you attend this event, you will receive a value of valuei. You can choose at most two non-overlapping events to attend such that the sum of their values is maximized.
// Return this maximum sum.
// Note that the start time and end time is inclusive: that is, you cannot attend two events where one of them starts and the other ends at the same time. More specifically, if you attend an event with end time t, the next event must start at or after t + 1.

// Example 1:
// Input: events = [[1,3,2],[4,5,2],[2,4,3]]
// Output: 4
// Explanation: Choose the green events, 0 and 1 for a sum of 2 + 2 = 4.

// Example 2:
// Example 1 Diagram
// Input: events = [[1,3,2],[4,5,2],[1,5,5]]
// Output: 5
// Explanation: Choose event 2 for a sum of 5.

// Example 3:
// Input: events = [[1,5,3],[1,5,1],[6,6,5]]
// Output: 8
// Explanation: Choose events 0 and 2 for a sum of 3 + 5 = 8.

// Constraints:
// 2 <= events.length <= 10^5
// events[i].length == 3
// 1 <= startTimei <= endTimei <= 10^9
// 1 <= valuei <= 10^6

function maxTwoEvents(events: number[][]): number {
  // sort events by end time
  events.sort((a, b) => a[1] - b[1]);

  const n = events.length;
  const maxValues = new Array(n).fill(0);

  // precompute maxValues to store the max value up to each event
  maxValues[0] = events[0][2];

  for (let i = 1; i < n; i++) {
    maxValues[i] = Math.max(maxValues[i - 1], events[i][2]);
  }

  let maxSum = 0;

  for (let i = 0; i < n; i++) {
    const [start, end, value] = events[i];

    // binary search to find the last event that ends before start time
    let low = 0;
    let high = i - 1;
    let lastCompatible = -1;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (events[mid][1] < start) {
        lastCompatible = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    // if a compatible event exists, calculate the sum
    const currentSum =
      value + (lastCompatible !== -1 ? maxValues[lastCompatible] : 0);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}
