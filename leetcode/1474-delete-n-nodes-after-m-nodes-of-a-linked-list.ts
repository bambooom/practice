// https://leetcode.com/problems/delete-n-nodes-after-m-nodes-of-a-linked-list/
// You are given the head of a linked list and two integers m and n.
// Traverse the linked list and remove some nodes in the following way:
// Start with the head as the current node.
// Keep the first m nodes starting with the current node.
// Remove the next n nodes
// Keep repeating steps 2 and 3 until you reach the end of the list.
// Return the head of the modified list after removing the mentioned nodes.

import { ListNode } from './util';

function deleteNodes(
  head: ListNode | null,
  m: number,
  n: number,
): ListNode | null {
  let current = head;
  // as long as we have a current
  while (current) {
    // have these two variables to track
    // how many nodes we've deleted and how many nodes we've skipped
    let skipped = 0;
    let deleted = 0;

    // keep skipping until you reach a node
    // before the first node that needs to be deleted
    while (current && skipped < m - 1) {
      current = current.next;
      skipped++;
    }

    // delete n nodes
    while (current && current.next && deleted < n) {
      current.next = current.next.next;
      deleted++;
    }

    if (current) {
      // move to next node
      current = current.next;
    }
  }

  return head;
}

// https://leetcode.com/problems/delete-n-nodes-after-m-nodes-of-a-linked-list/solutions/3392392/easiest-typescript-solution/?envType=study-plan-v2&envId=premium-algo-100
function deleteNodes2(
  head: ListNode | null,
  m: number,
  n: number,
  i = 0,
): ListNode | null {
  if (!head) return null;
  if (i % (m + n) >= m) return deleteNodes2(head.next, m, n, i + 1);

  head.next = deleteNodes2(head.next, m, n, i + 1);
  return head;
}
