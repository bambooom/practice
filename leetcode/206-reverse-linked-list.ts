// https://leetcode.com/problems/reverse-linked-list/
// Given the head of a singly linked list, reverse the list, and return the reversed list.

// Example1:
// Input: head = [1,2,3,4,5]
// Output: [5, 4, 3, 2, 1]

// Example2:
// Input: head = [1,2]
// Output: [2,1]

import { ListNode } from './util';

// recursive, 1-2-3-4-5
function reverseList(head: ListNode | null): ListNode | null {
  if (!head) return null;
  if (!head.next) return head;
  let curr = head.next;
  head.next = null;
  const newHead = reverseList(curr);
  if (newHead) {
    curr = newHead;
    while (curr.next) {
      curr = curr.next;
    }
    curr.next = head;
  }
  return newHead;
}

// iterative
function reverseList2(head: ListNode | null): ListNode | null {
  if (!head) return null;
  if (!head.next) return head;
  let prev = null;
  let curr: ListNode | null = head;
  while (curr) {
    const tmp: ListNode | null = curr.next;
    curr.next = prev;
    prev = curr;
    curr = tmp;
  }
  return prev;
}
