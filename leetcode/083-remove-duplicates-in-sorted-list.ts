/**
 * Definition for singly-linked list.
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

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
