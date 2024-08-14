// https://leetcode.com/problems/add-two-numbers-ii/

import { ListNode } from './util';

// You are given two non-empty linked lists representing two non-negative integers. The most significant digit comes first and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.
// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

// Input: l1 = [7,2,4,3], l2 = [5,6,4]
//    7->2->4->3
// +     5->6->4
// ------------
// => 7->8->0->7
// Output: [7,8,0,7]

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

// straightforward, push both values to separate stack, and do one by one
function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null,
): ListNode | null {
  const stack1: number[] = [];
  const stack2: number[] = [];

  while (l1) {
    stack1.push(l1.val);
    l1 = l1.next;
  }

  while (l2) {
    stack2.push(l2.val);
    l2 = l2.next;
  }

  let l3 = new ListNode(0);

  while (stack1.length || stack2.length) {
    let sum = 0;
    if (stack1.length) {
      sum += stack1.pop() as number;
    }
    if (stack2.length) {
      sum += stack2.pop() as number;
    }

    sum += l3.val;
    l3.val = sum % 10;
    const head = new ListNode(Math.floor(sum / 10));
    head.next = l3;
    l3 = head;
  }

  return l3.val === 0 ? l3.next : l3;
}

// https://leetcode.com/problems/add-two-numbers-ii/solutions/5145038/simple-to-understand-solution-with-explanation-beats-95-by-runtime/?envType=study-plan-v2&envId=programming-skills
function addTwoNumbers2(
  l1: ListNode | null,
  l2: ListNode | null,
): ListNode | null {
  let reversedL1: ListNode | null | undefined = null;
  let reversedL2: ListNode | null | undefined = null;

  while (l1) {
    reversedL1 = new ListNode(l1.val, reversedL1);
    l1 = l1.next;
  }

  while (l2) {
    reversedL2 = new ListNode(l2.val, reversedL2);
    l2 = l2.next;
  }

  let head = null;
  let isOverflow = 0;

  while (reversedL1 || reversedL2) {
    const currentRes =
      (reversedL1?.val || 0) + (reversedL2?.val || 0) + isOverflow;

    if (currentRes > 9) {
      const node: ListNode = new ListNode(currentRes % 10, head);
      head = node;

      isOverflow = 1;
    } else {
      const node: ListNode = new ListNode(currentRes, head);
      head = node;

      isOverflow = 0;
    }

    if (!reversedL1?.next && !reversedL2?.next && isOverflow) {
      const node = new ListNode(1, head);
      head = node;
    }

    reversedL1 = reversedL1?.next;
    reversedL2 = reversedL2?.next;
  }

  return head;
}
