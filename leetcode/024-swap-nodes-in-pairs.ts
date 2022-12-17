// https://leetcode.com/problems/swap-nodes-in-pairs/

import { ListNode } from './util';

function swapPairs(head: ListNode | null): ListNode | null {
  if (!head) return null;
  if (!head.next) return head;
  const next = head.next;
  head.next = swapPairs(head.next.next);
  next.next = head;
  return next;
}

// iterative, time O(n), space O(1)
function swapPairs2(head: ListNode | null): ListNode | null {
  // Store head to return list, Only instance of new data so space is O(1)
  const dummy = new ListNode(-1);
  dummy.next = head;

  let prev = dummy;

  // Traverse list
  while (head && head.next) {
    // Declare
    const n1 = head;
    const n2 = head.next;

    // Swap
    prev.next = n2;
    n1.next = n2.next;
    n2.next = n1;

    // Assign
    prev = n1;
    head = n1.next;
  }

  // The variable prev has been used to create the dummy list. dummy.next is still the head of new list
  return dummy.next;
}
