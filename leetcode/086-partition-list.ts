// https://leetcode.com/problems/partition-list/

// Given the head of a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x.

import { ListNode } from './util';

// two pointe approach, time O(N), space O(1)
function partition(head: ListNode | null, x: number): ListNode | null {
  if (!head) return null;
  let before = new ListNode(0);
  let after = new ListNode(0);
  const beforeHead = before;
  const afterHead = after;

  while (head) {
    if (head.val < x) {
      before.next = head;
      before = before.next;
    } else {
      after.next = head;
      after = after.next;
    }

    head = head.next;
  }

  after.next = null;
  before.next = afterHead.next;

  return beforeHead.next;
}
