// https://leetcode.com/problems/linked-list-cycle/

// Given head, the head of a linked list, determine if the linked list has a cycle in it.

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

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
