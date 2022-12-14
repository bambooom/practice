// https://leetcode.com/problems/reverse-nodes-in-k-group/
// #recursive

// Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.
import { ListNode } from './util';
function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  if (!head) return null;
  if (k === 0 || k === 1) return head;
  let cur: ListNode | null = head;
  let count = 0;
  while (count < k && cur) {
    cur = cur.next;
    count++;
  }

  if (count === k) {
    // get k nodes, then do reverse
    const reversedHead = reverseList(head, k);
    head.next = reverseKGroup(cur, k);
    // current head will be the end of the list, then next will be recursively next reversed group
    return reversedHead;
  }
  return head; // if not enought k nodes, do not reverse and return the original head
}

// Reverse k nodes of the given linked list.
function reverseList(head: ListNode, k: number): ListNode | null {
  let newHead: ListNode | null = null;
  let cur = head;
  while (k) {
    const nextNode = cur?.next;
    cur.next = newHead;
    newHead = cur;
    cur = nextNode as ListNode;
    k--;
  }
  return newHead;
}

// ============ another solution using stack
// space O(N)
function reverseKGroup2(head: ListNode | null, k: number): ListNode | null {
  const stack = [];
  const newNode = new ListNode(-1);
  let temp = newNode;

  while (head) {
    for (let i = 0; i < k && head; i++) {
      stack.push(head);
      head = head.next;
    }

    if (stack.length === k) {
      while (stack.length > 0) {
        temp.next = stack.pop() as ListNode;
        temp = temp.next;
      }
      temp.next = head;
    }
  }
  return newNode.next;
}
