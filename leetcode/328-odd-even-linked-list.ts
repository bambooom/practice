// https://leetcode.com/problems/odd-even-linked-list/

// Given the head of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return the reordered list.
// The first node is considered odd, and the second node is even, and so on.
// You must solve the problem in O(1) extra space complexity and O(n) time complexity.

import { ListNode } from './util';

function oddEvenList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;

  // Core strategy: make 2 chains (odds/evens) by "leapfrogging".
  // No need to keep track of a counter or extra pointers, just need these 3:
  let odd = head;
  let even: ListNode | null = head.next;
  const evenHead = even;

  // ("even.next" means more to go since even pointer is rightmost)
  // ("even &&" is there to avoid null reference error, but also for even positions)
  while (even && even.next !== null) {
    odd.next = even.next;
    odd = odd.next;
    even.next = odd.next;
    even = even.next;
  }
  // Connect the two chains: (tail of odds to head of evens)
  odd.next = evenHead;
  return head;
}
