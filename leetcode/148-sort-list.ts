// https://leetcode.com/problems/sort-list
// Given the head of a linked list, return the list after sorting it in ascending order.
// #linked-list #two-pointer #merge-sort #divide-conquer

import { ListNode } from './util';

function sortList(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) return head;

  // do merge sort, We need to split the list into two and merge them in the ascending order recursively.
  const [left, right] = split(head);
  // use a temparary node to link all the sorted nodes
  const root = new ListNode(undefined);
  return merge(root, sortList(left), sortList(right));
}

function split(node: ListNode) {
  let slow = node;
  let fast = node;
  // use fast & slow pointer to find the middle node so that
  // we can split the list into list[0 -> slow] & list[slow + 1 -> list.size]
  while (fast?.next && fast.next.next) {
    slow = slow.next as ListNode;
    fast = fast.next.next;
  }

  const left = node;
  const right = slow.next;
  // break off the list so that `left` doesn't link to `right`
  slow.next = null;

  return [left, right];
}

function merge(
  root: ListNode,
  left: ListNode | null,
  right: ListNode | null,
): ListNode | null {
  let pointer = root;
  /**
   * merge the smaller node in the `left` and `right` list first.
   * return the second node in the list because the first is a
   * temparary node.
   */
  while (left !== null || right !== null) {
    if (left === null) {
      pointer.next = right;
      right = right.next;
    } else if (right === null) {
      pointer.next = left;
      left = left.next;
    } else {
      if (left.val < right.val) {
        pointer.next = left;
        left = left.next;
      } else {
        pointer.next = right;
        right = right.next;
      }
    }
    pointer = pointer.next as ListNode;
  }

  return root.next;
}
