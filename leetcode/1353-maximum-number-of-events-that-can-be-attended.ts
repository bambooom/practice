// https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended/
// You are given an array of events where events[i] = [startDayi, endDayi]. Every event i starts at startDayi and ends at endDayi.
// You can attend an event i at any day d where startTimei <= d <= endTimei. You can only attend one event at any time d.
// Return the maximum number of events you can attend.

// Example 1:
// Input: events = [[1,2],[2,3],[3,4]]
// Output: 3
// Explanation: You can attend all the three events.
// One way to attend them all is as shown.
// Attend the first event on day 1.
// Attend the second event on day 2.
// Attend the third event on day 3.

// Example 2:
// Input: events= [[1,2],[2,3],[3,4],[1,2]]
// Output: 4

import {
  PriorityQueue,
  MinPriorityQueue,
} from '@datastructures-js/priority-queue';

// https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended/?envType=daily-question&envId=2025-07-07
function maxEvents(events: number[][]): number {
  const queue = new PriorityQueue<number[]>((a, b) => a[1] - b[1]);
  events.sort((a, b) => b[0] - a[0]);

  let day = events[events.length - 1][0];
  let total = 0;

  while (events.length > 0 || !queue.isEmpty()) {
    while (events.length > 0 && events[events.length - 1][0] <= day) {
      queue.enqueue(events.pop()!);
    }

    if (!queue.isEmpty() && day >= queue.front()[0]) {
      queue.dequeue();
      total++;
    }

    while (!queue.isEmpty() && day >= queue.front()[1]) {
      queue.dequeue();
    }

    day--;
  }

  return total;
}

// Editorial
function maxEvents2(events: number[][]): number {
  const n = events.length;
  let maxDay = 0;
  // Step 1: Find the maximum end day of all events
  for (const e of events) {
    maxDay = Math.max(maxDay, e[1]);
  }
  // Step 2: Sort the events by their start days
  events.sort((a, b) => a[0] - b[0]);
  // Step 3: Initialize a min priority queue to store the end days of events
  const pq = new MinPriorityQueue<number>();

  let ans = 0;

  // Step 4: Iterate through each day from 1 to maxDay
  for (let i = 1, j = 0; i <= maxDay; i++) {
    // Add the end days of events that start on or before the current day to the priority queue
    while (j < n && events[j][0] <= i) {
      pq.enqueue(events[j][1]);
      j++;
    }
    // Remove the end days that are earlier than the current day from the priority queue
    while (!pq.isEmpty() && pq.front() < i) {
      pq.dequeue();
    }
    // If the priority queue is not empty, attend the event that ends earliest
    if (!pq.isEmpty()) {
      pq.dequeue();
      ans++;
    }
  }

  return ans;
}
