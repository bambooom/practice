// https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/

// You are given the head of a linked list. Delete the middle node, and return the head of the modified linked list.
// The middle node of a linked list of size n is the ⌊n / 2⌋th node from the start using 0-based indexing, where ⌊x⌋ denotes the largest integer less than or equal to x.

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

// fast & slow pointers
function deleteMiddle(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return null;

  let slow: ListNode | null = head;
  let fast: ListNode | null = head.next.next;

  while (fast !== null && fast.next != null) {
    slow = slow!.next;
    fast = fast.next.next;
  }

  // When 'fast' reaches the end, remove the next node of 'slow' and return 'head'.
  slow!.next = slow!.next!.next;
  return head;
}
