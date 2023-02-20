// Given the head of a linked list, remove the nth node from the end of the list and return its head.

// Input: head = [1,2,3,4,5], n = 2
// Output: [1,2,3,5]

import { ListNode } from './util';

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  // move currentNode n steps into list
  if (head === null) return null;
  let currentNode: ListNode | null = head;

  for (let i = 0; i < n; i++) {
    currentNode = currentNode.next as ListNode;
  }

  if (currentNode === null) {
    return head.next;
  }

  // currentNode 提前 n steps，然后移动 nodeBeforeRemoved，两者相差就一直都是 n steps
  // 让 currentNode 移到到 end，nodeBeforeRemoved 所在的位置就是 Nth from End

  // move both pointers until currentNode reaches the end of list
  let nodeBeforeRemoved = head;
  while (currentNode.next !== null) {
    currentNode = currentNode.next;
    nodeBeforeRemoved = nodeBeforeRemoved.next as ListNode;
  }

  nodeBeforeRemoved.next = (nodeBeforeRemoved.next as ListNode).next;
  return head;
}

/**
Fast / Slow pointer pattern

0. F/S point to a dummy node (before head)
1. Fast go n times next
2. f/s go same time, while f===tail, s is the k-1
3. s.next = s.next.next
Return dummy.next
**/
function removeNthFromEnd2(head: ListNode | null, n: number): ListNode | null {
  const dummy = new ListNode();
  dummy.next = head;

  let fast = dummy;
  let slow = dummy;

  while (n-- !== 0) {
    fast = fast.next as ListNode;
  }
  while (fast.next !== null) {
    fast = fast.next;
    slow = slow.next as ListNode;
  }
  slow.next = (slow.next as ListNode).next;
  return dummy.next;
}
