//https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended-ii/
// You are given an array of events where events[i] = [startDayi, endDayi, valuei]. The ith event starts at startDayi and ends at endDayi, and if you attend this event, you will receive a value of valuei. You are also given an integer k which represents the maximum number of events you can attend.
// You can only attend one event at a time. If you choose to attend an event, you must attend the entire event. Note that the end day is inclusive: that is, you cannot attend two events where one of them starts and the other ends on the same day.
// Return the maximum sum of values that you can receive by attending events.

// Example 1:
// Input: events = [[1,2,4],[3,4,3],[2,3,1]], k = 2
// Output: 7
// Explanation: Choose the green events, 0 and 1 (0-indexed) for a total value of 4 + 3 = 7.

// Example 2:
// Input: events = [[1,2,4],[3,4,3],[2,3,10]], k = 2
// Output: 10
// Explanation: Choose event 2 for a total value of 10.
// Notice that you cannot attend any other event as they overlap, and that you do not have to attend k events.

// Example 3:
// Input: events = [[1,1,1],[2,2,2],[3,3,3],[4,4,4]], k = 3
// Output: 9
// Explanation: Although the events do not overlap, you can only attend 3 events. Pick the highest valued three.

// https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended-ii/solutions/5884336/beats-100-on-runtime-and-memory-explained/?envType=daily-question&envId=2025-07-08
function maxValue(events: number[][], k: number): number {
  // sort events by their end day
  events.sort((a, b) => a[1] - b[1]);
  const n = events.length;

  // init a DP table with (k+1) rows and n columns filled with 0
  const dp: number[][] = Array.from({ length: k + 1 }, () => Array(n).fill(0));

  // fill the first row of DP table for the case of attending one event
  let ans = 0;
  for (let i = 0; i < n; i++) {
    dp[1][i] = Math.max(i > 0 ? dp[1][i - 1] : 0, events[i][2]);
    ans = Math.max(ans, dp[1][i]);
  }

  // function to perform binary search to find the last event that does not overlap
  const binarySearch = (
    left: number,
    right: number,
    target: number,
  ): number => {
    let pos = -1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (events[mid][1] < target) {
        pos = mid; // update position if current event ends before target starts
        left = mid + 1; // search in the right half
      } else {
        right = mid - 1; // search in the left half
      }
    }
    return pos; // Return the position of the last non-overlapping event
  };

  // fill DP table for attending more than one evnet
  for (let i = 0; i < n; i++) {
    const j = binarySearch(0, i - 1, events[i][0]); // Find non-overlapping event index
    for (let l = 2; l <= k; l++) {
      // calculate maximum value for attending l events
      dp[l][i] = Math.max(
        j >= 0 ? dp[l - 1][j] + events[i][2] : 0, // Include the current event
        i > 0 ? dp[l][i - 1] : 0, // Exclude the current event
      );
      ans = Math.max(dp[l][i], ans);
    }
  }

  return ans;
}
