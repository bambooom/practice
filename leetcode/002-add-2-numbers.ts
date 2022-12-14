// https://leetcode.com/problems/add-two-numbers/
// #linked-list #recursion

import { ListNode } from './util';

// iterative
function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null,
): ListNode | null {
  if (!l1 && !l2) return null;
  let d1 = l1?.val as number;
  let d2 = l2?.val as number;
  let carry = 0;
  const root = new ListNode(d1 + d2);
  if (d1 + d2 > 9) {
    carry = 1;
    root.val = (d1 + d2) % 10;
  }
  let res = root;
  while (l1?.next || l2?.next) {
    d1 = (l1?.next ? l1?.next.val : 0) + carry;
    d2 = l2?.next ? l2?.next.val : 0;
    if (d1 + d2 > 9) {
      carry = 1;
      res.next = new ListNode((d1 + d2) % 10);
    } else {
      carry = 0;
      res.next = new ListNode(d1 + d2);
    }
    if (l1?.next) l1 = l1?.next;
    if (l2?.next) l2 = l2?.next;
    res = res.next;
  }
  if (carry) {
    res.next = new ListNode(1);
  }

  return root;
}

// use recursive
function addTwoNumbers2(
  l1: ListNode | null,
  l2: ListNode | null,
  carry = 0,
): ListNode | null {
  if (l1 || l2) {
    const next1 = l1?.next || null;
    const next2 = l2?.next || null;
    const sum = (l1?.val || 0) + (l2?.val || 0) + carry;
    const nextCarry = sum >= 10 ? 1 : 0;

    return new ListNode(sum % 10, addTwoNumbers2(next1, next2, nextCarry));
  } else if (carry) {
    return new ListNode(1);
  }

  return null;
}
