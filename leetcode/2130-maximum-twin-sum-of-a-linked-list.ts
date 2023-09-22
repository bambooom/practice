// https://leetcode.com/problems/maximum-twin-sum-of-a-linked-list/

import { ListNode } from './util';

function pairSum(head: ListNode | null): number {
  if (!head) return 0;
  const stack: number[] = [];
  let slow: ListNode | null = head;
  let fast: ListNode | null = head.next;

  while (fast != null) {
    stack.push(slow.val);
    slow = slow.next!;
    fast = fast.next!.next;
  }
  // get to the mid point of the list, which is slow now
  // traverse the rest of the list, and pop the stack which will get the twin sum
  let maxTwinSum = 0;
  while (slow != null) {
    maxTwinSum = Math.max(maxTwinSum, slow.val + (stack.pop() as number));
    slow = slow.next;
  }

  return maxTwinSum;
}
