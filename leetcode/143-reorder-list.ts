// https://leetcode.com/problems/reorder-list/
// input:  L1,L2,L3,L4,L5,L6
// output: L1,L6,L2,L5,L3,L4
// input:  L1,L2,L3,L4,L5
// output: L1,L5,L2,L4,L3

import { ListNode } from './util';
/**
  Do not return anything, modify head in-place instead.
 */
function reorderList(head: ListNode | null): void {
  if (!head) return;
  let cur: ListNode | null = head;
  const stack = [];
  while (cur) {
    stack.push(cur);
    cur = cur.next;
  }

  let node: ListNode = head;
  const len = stack.length;
  for (let i = 0; i < len; i++) {
    // can't use `stack.length` here to replace `len` since stack length is changing
    if (i % 2 === 0) {
      node.next = stack.shift() as ListNode;
    } else {
      node.next = stack.pop() as ListNode;
    }
    node = node.next as ListNode;
  }
  node.next = null;
}
