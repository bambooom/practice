/**
 * Definition for singly-linked list.
 */

import { ListNode } from './util';

// time O(n), space O(1)
export function deleteDuplicates(head: ListNode | null): ListNode | null {
  if (!head) {
    return null;
  }

  let currNode: ListNode | null = head;

  while (currNode?.next) {
    let nextNode: ListNode | null = currNode.next;

    while (nextNode && nextNode.val === currNode.val) {
      nextNode = nextNode.next;
    }

    currNode.next = nextNode;
    currNode = nextNode;
  }

  return head;
}
