// https://leetcode.com/problems/plus-one-linked-list/
// Given a non-negative integer represented as a linked list of digits, plus one to the integer.
// The digits are stored such that the most significant digit is at the head of the list.

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

function plusOne(head: ListNode | null): ListNode | null {
  // 9,9,9
  // res = 1,0,0,0
  const dummy = new ListNode();
  dummy.next = head;
  const carry = solve(head);

  if (carry > 0) {
    dummy.val = carry;
    return dummy;
  }
  return head;
}
// When we get to the end, we add 1 to the value and return any carry over from the sum. 9 + 1 = 10. Carry 1
// As we pop the recursion stack; if there is a remainder/carry to add, we can add to current node value
// and again recompute and return the new carry for the next node popped in the recursion stack.
// Finally, if there is a carry at the end whence we need to add an additional node. e.g. 999 + 1 -> 1000;
// we return the new head via a dummy node; else we return original head.
function solve(head: ListNode | null): number {
  if (head?.next === null) {
    const sum = head.val + 1; // 9 + 1 = 10
    head.val = sum % 10;
    const carry = Math.floor(sum / 10);
    return carry;
  }

  let carry = solve(head ? head.next : null);

  if (carry > 0 && head) {
    const sum = head.val + carry;
    head.val = sum % 10;
    carry = Math.floor(sum / 10);
  }
  return carry;
}

// https://leetcode.com/problems/plus-one-linked-list/solutions/973586/javascript-o-n-time-o-1-space/?envType=study-plan-v2&envId=premium-algo-100
function plusOne2(head: ListNode | null): ListNode | null {
  const first = new ListNode(0);
  first.next = head;
  let farRightNine: ListNode | null = first;

  while (head) {
    if (head.val !== 9) {
      farRightNine = head;
    }
    head = head.next;
  }

  farRightNine.val++;
  farRightNine = farRightNine.next;

  while (farRightNine) {
    farRightNine.val = 0;
    farRightNine = farRightNine.next;
  }
  return first.val === 0 ? first.next : first;
}

// https://leetcode.com/problems/plus-one-linked-list/solutions/452690/javascript-stack-solution/?envType=study-plan-v2&envId=premium-algo-100
function plusOne3(head: ListNode | null): ListNode | null {
  // stack solution
  const stack: ListNode[] = [];

  // push everything onto the stack
  let curr = head;
  while (curr) {
    stack.push(curr);
    curr = curr.next;
  }

  let carry = true;
  while (stack.length > 0) {
    curr = stack.pop()!;

    if (carry) {
      curr.val = curr.val + 1;
      carry = false;
    }

    if (curr.val === 10) {
      curr.val = 0;
      carry = true;

      if (carry && stack.length === 0) {
        // need to add a new head node with value one
        const newHead = new ListNode(1);
        newHead.next = head;
        return newHead;
      }
    } else {
      // If we added one and don't have to carry, no need to look at rest of stack
      return head;
    }
  }

  return head;
}
