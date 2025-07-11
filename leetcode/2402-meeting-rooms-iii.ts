//https://leetcode.com/problems/meeting-rooms-iii/description
// You are given an integer n. There are n rooms numbered from 0 to n - 1.
// You are given a 2D integer array meetings where meetings[i] = [starti, endi] means that a meeting will be held during the half-closed time interval [starti, endi). All the values of starti are unique.
// Meetings are allocated to rooms in the following manner:
// Each meeting will take place in the unused room with the lowest number.
// If there are no available rooms, the meeting will be delayed until a room becomes free. The delayed meeting should have the same duration as the original meeting.
// When a room becomes unused, meetings that have an earlier original start time should be given the room.
// Return the number of the room that held the most meetings. If there are multiple rooms, return the room with the lowest number.
// A half-closed interval [a, b) is the interval between a and b including a and not including b.

// Example 1:
// Input: n = 2, meetings = [[0,10],[1,5],[2,7],[3,4]]
// Output: 0
// Explanation:
// - At time 0, both rooms are not being used. The first meeting starts in room 0.
// - At time 1, only room 1 is not being used. The second meeting starts in room 1.
// - At time 2, both rooms are being used. The third meeting is delayed.
// - At time 3, both rooms are being used. The fourth meeting is delayed.
// - At time 5, the meeting in room 1 finishes. The third meeting starts in room 1 for the time period [5,10).
// - At time 10, the meetings in both rooms finish. The fourth meeting starts in room 0 for the time period [10,11).
// Both rooms 0 and 1 held 2 meetings, so we return 0.

// Example 2:
// Input: n = 3, meetings = [[1,20],[2,10],[3,5],[4,9],[6,8]]
// Output: 1
// Explanation:
// - At time 1, all three rooms are not being used. The first meeting starts in room 0.
// - At time 2, rooms 1 and 2 are not being used. The second meeting starts in room 1.
// - At time 3, only room 2 is not being used. The third meeting starts in room 2.
// - At time 4, all three rooms are being used. The fourth meeting is delayed.
// - At time 5, the meeting in room 2 finishes. The fourth meeting starts in room 2 for the time period [5,10).
// - At time 6, all three rooms are being used. The fifth meeting is delayed.
// - At time 10, the meetings in rooms 1 and 2 finish. The fifth meeting starts in room 1 for the time period [10,12).
// Room 0 held 1 meeting while rooms 1 and 2 each held 2 meetings, so we return 1.

import {
  MinPriorityQueue,
  ICompare,
  PriorityQueue,
} from '@datastructures-js/priority-queue';

interface UsedRoomInfo {
  endTime: number;
  room: number;
}
// https://leetcode.com/problems/meeting-rooms-iii/solutions/6636323/optimal-solution-using-heaps/?envType=daily-question&envId=2025-07-11
function mostBooked(n: number, meetings: number[][]): number {
  meetings.sort((a, b) => a[0] - b[0]); // sort by start date
  // keep track of available rooms
  const unusedRooms = new MinPriorityQueue<number>();
  const compareFn: ICompare<UsedRoomInfo> = (
    a: UsedRoomInfo,
    b: UsedRoomInfo,
  ) => {
    if (a.endTime !== b.endTime) {
      return a.endTime - b.endTime; // earlier finish comes first
    }
    return a.room - b.room; // if same end time, use smaller room index
  };
  // keep track of rooms that are currently in use
  const usedRooms = new PriorityQueue<UsedRoomInfo>(compareFn);

  // Keep track of the number of meetings held in each room in array counts
  const counts = new Array(n).fill(0);
  // initialize all rooms are free
  for (let i = 0; i < n; i++) {
    unusedRooms.enqueue(i);
  }

  for (const [start, end] of meetings) {
    // free up rooms that are done
    while (!usedRooms.isEmpty() && usedRooms.front().endTime <= start) {
      const { room } = usedRooms.dequeue();
      unusedRooms.enqueue(room);
    }
    // case1: some rooms are free
    if (!unusedRooms.isEmpty()) {
      // If there are available rooms, assign the meeting to the room with the lowest number.
      const room = unusedRooms.dequeue();
      counts[room] += 1;
      usedRooms.enqueue({ endTime: end, room });
    } else {
      // case2: all rooms are busy
      // If all rooms are busy, assign the meeting to the room that will become available the soonest.
      const { endTime, room } = usedRooms.dequeue();
      counts[room] += 1;
      usedRooms.enqueue({ endTime: endTime + end - start, room });
    }
  }

  // counts[i] represents the number of meetings held in room i.
  let maxCount = 0;
  let result = 0;
  // iterate through the counts array to find the room with the maximum number of meetings, and return its number.
  for (let i = 0; i < n; i++) {
    if (counts[i] > maxCount || (counts[i] === maxCount && i < result)) {
      maxCount = counts[i];
      result = i;
    }
  }

  return result;
}

//https://leetcode.com/problems/meeting-rooms-iii/solutions/4746747/beats-75-00-of-users-with-typescript/?envType=daily-question&envId=2025-07-11
function mostBooked2(n: number, meetings: number[][]): number {
  meetings.sort((a, b) => a[0] - b[0]); // Sorting the meetings by their start time

  const lastAvailable: number[] = new Array(n).fill(0); // When each room will be available
  const roomUsedCount: number[] = new Array(n).fill(0); // Count of how many times each room is used

  for (const [start, end] of meetings) {
    let found = false;
    let earlyEndRoom = 0;
    let earlyEndTime = Infinity;

    for (let room = 0; room < n; room++) {
      if (lastAvailable[room] <= start) {
        // If the room is available for the current meeting
        lastAvailable[room] = end; // Update the room's next available time
        roomUsedCount[room]++; // Increment the usage count
        found = true; // Mark as found so we don't use the early end logic
        break; // Exit the loop as we've found a room
      }

      // Keep track of the earliest available room in case none are available at the start time
      if (lastAvailable[room] < earlyEndTime) {
        earlyEndTime = lastAvailable[room];
        earlyEndRoom = room;
      }
    }

    if (!found) {
      // If no room is available at the meeting's start time, use the earliest ending room
      lastAvailable[earlyEndRoom] = earlyEndTime + (end - start); // Update its next available time
      roomUsedCount[earlyEndRoom]++; // Increment the usage count
    }
  }

  // Determine the room that was used the most
  let resultRoom = 0;
  for (let room = 1; room < n; room++) {
    if (roomUsedCount[room] > roomUsedCount[resultRoom]) {
      resultRoom = room;
    }
  }

  return resultRoom;
}
