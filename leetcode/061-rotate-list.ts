// https://leetcode.com/problems/rotate-list/

import { ListNode } from './util';

// with extra space
function rotateRight(head: ListNode | null, k: number): ListNode | null {
  if (!head || !head.next || !k) return head;
  const list = [];
  let len = 0;
  // put linked list into array
  for (let cur: ListNode | null = head; cur; cur = cur.next) {
    list[len++] = cur;
  }
  // calculate the break position
  const newHead = len - (k % len);
  if (newHead === len) return head;
  // change pointer
  list[len - 1].next = head;
  list[newHead - 1].next = null;
  return list[newHead];
}

// without extra space
function rotateRight2(head: ListNode | null, k: number): ListNode | null {
  if (!head || !head.next || !k) return head;

  let newTail = head;
  let tail = head;
  let count = 1;
  // get current tail node and length of linked list
  while (tail.next) {
    tail = tail.next;
    count++;
  }
  // link current tail to head
  tail.next = head;
  // get the new tail node
  for (let i = 1; i < count - (k % count); ++i) {
    newTail = newTail.next as ListNode;
  }
  const ret = newTail.next;
  // change it into the real tail
  newTail.next = null;
  return ret;
}
