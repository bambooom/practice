// https://leetcode.com/problems/find-the-minimum-and-maximum-number-of-nodes-between-critical-points
// A critical point in a linked list is defined as either a local maxima or a local minima.
// A node is a local maxima if the current node has a value strictly greater than the previous node and the next node.
// A node is a local minima if the current node has a value strictly smaller than the previous node and the next node.
// Note that a node can only be a local maxima/minima if there exists both a previous node and a next node.
// Given a linked list head, return an array of length 2 containing [minDistance, maxDistance] where minDistance is the minimum distance between any two distinct critical points and maxDistance is the maximum distance between any two distinct critical points. If there are fewer than two critical points, return [-1, -1].

// Example 1:
// Input: head = [3,1]
// Output: [-1,-1]
// Explanation: There are no critical points in [3, 1].

// Example 2:
// Input: head = [5,3,1,2,5,1,2]
// Output: [1,3]
// Explanation: There are three critical points:
// - [5,3,1,2,5,1,2]: The third node is a local minima because 1 is less than 3 and 2.
// - [5,3,1,2,5,1,2]: The fifth node is a local maxima because 5 is greater than 2 and 1.
// - [5,3,1,2,5,1,2]: The sixth node is a local minima because 1 is less than 5 and 2.
// The minimum distance is between the fifth and the sixth node. minDistance = 6 - 5 = 1.
// The maximum distance is between the third and the sixth node.maxDistance = 6 - 3 = 3.

// Example 3:
// Input: head = [1,3,2,2,3,2,2,2,7]
// Output: [3,3]
// Explanation: There are two critical points:
// - [1,3,2,2,3,2,2,2,7]: The second node is a local maxima because 3 is greater than 1 and 2.
// - [1,3,2,2,3,2,2,2,7]: The fifth node is a local maxima because 3 is greater than 2 and 2.
// Both the minimum and maximum distances are between the second and the fifth node.
// Thus, minDistance and maxDistance is 5 - 2 = 3.
// Note that the last node is not considered a local maxima because it does not have a next node.

import { ListNode } from './util';

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

// https://leetcode.com/problems/find-the-minimum-and-maximum-number-of-nodes-between-critical-points/solutions/2026429/simple-and-fast-typescript-javascript-solution/?envType=daily-question&envId=2024-07-05
function nodesBetweenCriticalPoints(head: ListNode): number[] {
  let node: ListNode | null = head;
  const criticalPoints = [];
  let idx = 0;
  let preVal = 0;

  while (node.next) {
    if (preVal && node.next) {
      if (
        (preVal > node.val && node?.next.val > node.val) ||
        (preVal < node.val && node?.next.val < node.val)
      ) {
        criticalPoints.push(idx);
      }
    }
    preVal = node.val;
    node = node.next;
    idx++;
  }

  if (criticalPoints.length < 2) return [-1, -1];
  criticalPoints.sort((a, b) => a - b);

  let minDistance = criticalPoints[1] - criticalPoints[0];
  const maxDistance =
    criticalPoints[criticalPoints.length - 1] - criticalPoints[0];
  for (let i = 1; i < criticalPoints.length - 1; i++) {
    minDistance = Math.min(
      minDistance,
      criticalPoints[i + 1] - criticalPoints[i],
    );
  }
  return [minDistance, maxDistance];
}
