// https://leetcode.com/problems/reverse-nodes-in-k-group/
// Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.
// k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.
// You may not alter the values in the list's nodes, only nodes themselves may be changed.
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

// https://leetcode.com/problems/reverse-nodes-in-k-group/solutions/5635770/reversing-nodes-in-k-group-in-a-singly-linked-list/?envType=study-plan-v2&envId=top-100-liked
// seems faster, but use more memory
function reverseKGroup3(head: ListNode | null, k: number): ListNode | null {
  if (k === 1) return head;

  const dummy = new ListNode(0, head);
  let root: ListNode | null = dummy;
  while (root != null) {
    const prev: ListNode = root;
    let cur: ListNode | null = root;

    let count = 0;
    while (count !== k) {
      count++;
      cur = cur.next;
      if (cur == null) {
        return dummy.next;
      }
    }

    const nextRoot = prev.next;
    prev.next = cur;

    let node: ListNode | null = nextRoot!;
    let next = node.next;
    node.next = cur.next;

    while (node != cur) {
      [next!.next, node, next] = [node, next, next!.next];
    }
    root = nextRoot;
  }

  return dummy.next;
}
