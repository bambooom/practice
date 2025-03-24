// https://leetcode.com/problems/count-days-without-meetings/

// You are given a positive integer days representing the total number of days an employee is available for work (starting from day 1). You are also given a 2D array meetings of size n where, meetings[i] = [start_i, end_i] represents the starting and ending days of meeting i (inclusive).
// Return the count of days when the employee is available for work but no meetings are scheduled.
// Note: The meetings may overlap.

// Example 1:
// Input: days = 10, meetings = [[5,7],[1,3],[9,10]]
// Output: 2
// Explanation:
// There is no meeting scheduled on the 4th and 8th days.

// Example 2:
// Input: days = 5, meetings = [[2,4],[1,3]]
// Output: 1
// Explanation:
// There is no meeting scheduled on the 5th day.

// Example 3:
// Input: days = 6, meetings = [[1,6]]
// Output: 0
// Explanation:
// Meetings are scheduled for all working days.

function countDays(days: number, meetings: number[][]): number {
  if (meetings.length === 0) return days;

  // sort the meetings by start day
  meetings.sort((a, b) => a[0] - b[0]);
  const mergedMeetings: number[][] = [];

  let meetingDays = 0;

  for (const [start, end] of meetings) {
    const n = mergedMeetings.length;
    // if the current meeting starts after the last merged meeting ends
    if (n === 0 || mergedMeetings[n - 1][1] < start - 1) {
      mergedMeetings.push([start, end]);
    } else {
      // merge the current meeting with the last merged meeting
      mergedMeetings[n - 1][1] = Math.max(mergedMeetings[n - 1][1], end);
    }
  }

  for (const [start, end] of mergedMeetings) {
    meetingDays += end - start + 1;
    if (meetingDays >= days) return 0;
  }

  return days - meetingDays;
}

function countDays2(days: number, meetings: number[][]): number {
  meetings.sort((meeting1, meeting2) => meeting1[0] - meeting2[0]);

  let max = 0; // track the maximum end day of meetings
  let daysNoMeetings = 0;
  for (let i = 0; i < meetings.length; ++i) {
    // add the gap between current meeting's start day and the previous maximum end day to daysNoMeetings
    // thie gap represents the day without meetings between the previous meeting and the current one.
    daysNoMeetings += Math.max(0, meetings[i][0] - max - 1);
    max = Math.max(max, meetings[i][1]); // update max end day
  }

  // Finally, add the gap between the last meeting's end day (max) and the total available days (days) to daysNoMeetings. This represents the days without meetings after the last scheduled meeting.
  daysNoMeetings += Math.max(0, days - max);
  return daysNoMeetings;
}
