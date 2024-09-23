// https://leetcode.com/problems/linked-list-cycle/

// Given head, the head of a linked list, determine if the linked list has a cycle in it.

import { ListNode } from './util';

// solution 1: hash table, space O(n), time O(n)
function hasCycle(head: ListNode | null): boolean {
  const hash = new Set<ListNode>();
  while (head) {
    if (head.next && hash.has(head.next)) {
      return true;
    } else {
      hash.add(head);
      head = head.next;
    }
  }
  return false;
}

// solution2: use 2 pointers at diff speed, fast & slow, space O(1) time O(n)
function hasCycle2(head: ListNode | null): boolean {
  if (!head) return false;
  let slow = head;
  let fast = head.next;

  while (slow !== fast) {
    if (!fast || !fast.next) return false;
    slow = slow.next as ListNode;
    fast = fast.next.next;
  }
  return true;
}

// https://leetcode.com/problems/linked-list-cycle/solutions/4833039/ts-easy-to-understand-two-pointers-approach/?envType=study-plan-v2&envId=top-100-liked
function hasCycle3(head: ListNode | null): boolean {
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;

  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
    if (slow === fast) {
      return true;
    }
  }

  return false;
}
