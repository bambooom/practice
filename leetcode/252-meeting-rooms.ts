// https://leetcode.com/problems/meeting-rooms/description

// Given an array of meeting time intervals where intervals[i] = [starti, endi], determine if a person could attend all meetings.

// Example 1:
// Input: intervals = [[0,30],[5,10],[15,20]]
// Output: false
// Example 2:
// Input: intervals = [[7,10],[2,4]]
// Output: true

// Time complexity: O(n*log(n))
// Space complexity: O(1)
function canAttendMeetings(intervals: number[][]): boolean {
  intervals.sort((a: number[], b: number[]) => a[0] - b[0]);
  for (let i = 0; i < intervals.length - 1; i++) {
    const [start, end] = intervals[i];
    const [nextStart, nextEnd] = intervals[i + 1];
    if (end > nextStart) {
      // 两个 interval 有重叠
      return false;
    }
  }

  return true;
}
