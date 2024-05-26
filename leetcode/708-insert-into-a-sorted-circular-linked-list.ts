// https://leetcode.com/problems/insert-into-a-sorted-circular-linked-list
// Given a Circular Linked List node, which is sorted in non-descending order, write a function to insert a value insertVal into the list such that it remains a sorted circular list. The given node can be a reference to any single node in the list and may not necessarily be the smallest value in the circular list.
// If there are multiple suitable places for insertion, you may choose any place to insert the new value. After the insertion, the circular list should remain sorted.
// If the list is empty (i.e., the given node is null), you should create a new single circular list and return the reference to that single node. Otherwise, you should return the originally given node.

import { Node } from './util';

// https://leetcode.com/problems/insert-into-a-sorted-circular-linked-list/?envType=study-plan-v2&envId=premium-algo-100
function insert(head: Node | null, insertVal: number): Node | null {
  // handle empty linked list
  if (!head) {
    const node = new Node(insertVal);
    node.next = node;
    return node;
  }
  let node: Node | null = head;
  while (node) {
    const isInsertValGreaterThanCur = insertVal >= node.val;
    const isInsertValLowerThanNext = insertVal <= node.next!.val;
    const isCurGreaterThanNext = node.val > node.next!.val;

    const conditions = [
      head === node.next, // Handle worst-case scenario, when we return back to the head
      isInsertValGreaterThanCur &&
        (isCurGreaterThanNext || isInsertValLowerThanNext),
      isCurGreaterThanNext && isInsertValLowerThanNext,
    ];

    if (conditions.some(Boolean)) {
      node.next = new Node(insertVal, node.next!);
      return head;
    }

    node = node.next;
  }
  // This point will never be reached
  return head;
}
