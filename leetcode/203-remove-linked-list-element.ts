// https://leetcode.com/problems/remove-linked-list-elements/
// Given the head of a linked list and an integer val, remove all the nodes of the linked list that has Node.val == val, and return the new head.

import { ListNode } from './util';

function removeElements(head: ListNode | null, val: number): ListNode | null {
  while (head && head.val === val) {
    head = head?.next;
  }
  if (!head) return null;

  let curr: ListNode | null = head;
  while (curr) {
    const next = curr.next;
    if (next && next.val === val) {
      curr.next = next.next;
    } else {
      curr = curr.next;
    }
  }

  return head;
}

/**
 * Using sentinel node: https://en.wikipedia.org/wiki/Sentinel_node
 * : a specifically designated node used with linked lists and trees as a traversal path terminator.
 * : This type of node does not hold or reference any data managed by the data structure.
 * widely used in trees and linked lists as pseudo-heads, pseudo-tails, markers of level end, etc
 * Their main purpose is to standardize the situation, for example, make linked list to be never empty
 * and never headless and hence simplify insert and delete.
 *
 * Algorithm:
 * 1. Initiate sentinel node as ListNode(0) and set it to be the new head: sentinel.next = head.
 * 2. Initiate two pointers to track the current node and its predecessor: curr and prev.
 * 3. While curr is not a null pointer:
 *    3.1 Compare the value of the current node with the value to delete.
 *        - In the values are equal, delete the current node: prev.next = curr.next.
 *        - Otherwise, set predecessor to be equal to the current node.
 *    3.2 Move to the next node: curr = curr.next.
 * 4. Return sentinel.next.
 */

// time: O(n), space O(1)
function removeElements2(head: ListNode | null, val: number): ListNode | null {
  const sentinel = new ListNode(0);
  sentinel.next = head;
  let curr = head;
  let prev = sentinel;
  while (curr) {
    if (curr.val === val) {
      prev.next = curr.next;
    } else {
      prev = curr;
    }
    curr = curr.next;
  }

  return sentinel.next;
}
