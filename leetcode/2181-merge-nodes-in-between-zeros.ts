// https://leetcode.com/problems/merge-nodes-in-between-zeros/
// You are given the head of a linked list, which contains a series of integers separated by 0's. The beginning and end of the linked list will have Node.val == 0.
// For every two consecutive 0's, merge all the nodes lying in between them into a single node whose value is the sum of all the merged nodes. The modified list should not contain any 0's.
// Return the head of the modified linked list.

// Example 1:
// Input: head = [0,3,1,0,4,5,2,0]
// Output: [4,11]
// Explanation:
// The above figure represents the given linked list. The modified list contains
// - The sum of the nodes marked in green: 3 + 1 = 4.
//   - The sum of the nodes marked in red: 4 + 5 + 2 = 11.

// Example 2:
// Input: head = [0, 1, 0, 3, 0, 2, 2, 0]
// Output: [1,3,4]
// Explanation:
// The above figure represents the given linked list. The modified list contains
// - The sum of the nodes marked in green: 1 = 1.
// - The sum of the nodes marked in red: 3 = 3.
// - The sum of the nodes marked in yellow: 2 + 2 = 4.

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

function mergeNodes(head: ListNode | null): ListNode | null {
  const dummy = new ListNode();
  dummy.next = head;
  let cur = dummy;
  let prev: ListNode | null;
  while (cur.next) {
    prev = cur;
    if (cur.next.val === 0) {
      cur = cur.next;
    }
    if (cur.next) {
      cur.val += cur.next.val;
      cur.next = cur.next.next;
    }
  }
  prev!.next = null;
  return head;
}
