// https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer/
// Given head which is a reference node to a singly-linked list. The value of each node in the linked list is either 0 or 1. The linked list holds the binary representation of a number.
// Return the decimal value of the number in the linked list.
// The most significant bit is at the head of the linked list.

// Example 1:
// Input: head = [1,0,1]
// Output: 5
// Explanation: (101) in base 2 = (5) in base 10

// Example 2:
// Input: head = [0]
// Output: 0

import { ListNode } from './util';

function getDecimalValue(head: ListNode | null): number {
  // 101 = 1 * 2^2 + 0 * 2^1 + 1 * 2^0 = 4 + 0 + 1 = 5
  let res = 0;
  while (head) {
    res = res * 2 + head.val;
    head = head.next;
  }
  return res;
}
