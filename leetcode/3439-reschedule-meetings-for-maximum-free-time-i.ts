// https://leetcode.com/problems/reschedule-meetings-for-maximum-free-time-i/
// You are given an integer eventTime denoting the duration of an event, where the event occurs from time t = 0 to time t = eventTime.
// You are also given two integer arrays startTime and endTime, each of length n. These represent the start and end time of n non-overlapping meetings, where the ith meeting occurs during the time [startTime[i], endTime[i]].
// You can reschedule at most k meetings by moving their start time while maintaining the same duration, to maximize the longest continuous period of free time during the event.
// The relative order of all the meetings should stay the same and they should remain non-overlapping.
// Return the maximum amount of free time possible after rearranging the meetings.
// Note that the meetings can not be rescheduled to a time outside the event.

// Example 1:
// Input: eventTime = 5, k = 1, startTime = [1,3], endTime = [2,5]
// Output: 2
// Explanation:
// Reschedule the meeting at [1, 2] to [2, 3], leaving no meetings during the time [0, 2].

// Example 2:
// Input: eventTime = 10, k = 1, startTime = [0,2,9], endTime = [1,4,10]
// Output: 6
// Explanation:
// Reschedule the meeting at [2, 4] to [1, 3], leaving no meetings during the time [3, 9].

// Example 3:
// Input: eventTime = 5, k = 2, startTime = [0,1,2,3,4], endTime = [1,2,3,4,5]
// Output: 0
// Explanation:
// There is no time during the event not occupied by meetings.

// sliding window
function maxFreeTime(
  eventTime: number,
  k: number,
  startTime: number[],
  endTime: number[],
): number {
  const eventCount = startTime.length;

  // calculate gaps between meetings
  const gaps: number[] = [];
  for (let i = 1; i < eventCount; i++) {
    gaps.push(startTime[i] - endTime[i - 1]);
  }

  // add gaps before the first meeting and after the last meeting
  gaps.unshift(startTime[0]);
  gaps.push(eventTime - endTime[eventCount - 1]);

  // if k >= number of gaps, we can merge all gaps
  if (k >= gaps.length - 1) {
    return gaps.reduce((a, b) => a + b, 0);
  }

  // Sliding window to find the maximum sum of gaps after rescheduling k meetings
  // In other words, merge (k + 1) adjacent gaps and see which creates the biggest gap
  // For instance, if k=1, we merge any 2 adjacent gaps, and so on

  // sliding window to find the maximum sum of gaps after rescheduling k meetings
  // keep track of the maximum free time found so far
  let result = 0;
  // keep track of the sum of the gaps in the current window, init the window with first k+1 gaps
  let freeTime = gaps.slice(0, k + 1).reduce((a, b) => a + b, 0);
  // update the result with the initial free time, which is the sum of the first k+1 gaps
  result = freeTime;

  // slide the window over the array of gaps
  for (let i = k + 1; i < gaps.length; i++) {
    // subtract the gap that is leaving the window and add the gap that is entering
    freeTime = freeTime - gaps[i - (k + 1)] + gaps[i];
    // update the result if the current window has a larger sum of gaps
    result = Math.max(result, freeTime);
  }

  return result;
}

// editorial
function maxFreeTime2(
  eventTime: number,
  k: number,
  startTime: number[],
  endTime: number[],
): number {
  const n = startTime.length;
  let res = 0;
  let t = 0;

  for (let i = 0; i < n; i++) {
    t += endTime[i] - startTime[i];
    const left = i <= k - 1 ? 0 : endTime[i - k];
    const right = i === n - 1 ? eventTime : startTime[i + 1];
    res = Math.max(res, right - left - t);
    if (i >= k - 1) {
      t -= endTime[i - k + 1] - startTime[i - k + 1];
    }
  }
  return res;
}
