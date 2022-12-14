// https://leetcode.com/problems/linked-list-cycle-ii/
// #hash-table #two pointer
// Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null.

import { ListNode } from './util';
// use hash table
function detectCycle(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return null;
  const hash = new Set<ListNode>();
  while (head) {
    if (head.next && hash.has(head.next)) {
      return head.next;
    } else {
      hash.add(head);
      head = head.next;
    }
  }
  return null;
};


// use two pointers at diff speed
function detectCycle2(head: ListNode | null): ListNode | null {
  if (!head) return null;
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;
  while (fast && fast.next && fast.next.next) {
    slow = slow?.next || null;
    fast = fast.next.next;
    if (slow === fast) { // detected cycle, but need to find the position
      slow = head;
      while (slow !== fast) {
        slow = slow?.next || null;
        fast = fast?.next || null;
      }
      return slow;
    }
  }
  return null;
}
