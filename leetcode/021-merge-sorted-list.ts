// https://leetcode.com/problems/merge-two-sorted-lists/

/**
 * You are given the heads of two sorted linked lists list1 and list2.
 * Merge the two lists in a one sorted list.
 * The list should be made by splicing together the nodes of the first two lists.
 * Return the head of the merged linked list.
 */

import { ListNode } from './util';

export function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null,
): ListNode | null {
  let list = new ListNode();
  const current = list;

  while (list1 !== null && list2 !== null) {
    // Select the smallest value from either linked list,
    // then increment that list forward.
    if (list1.val < list2.val) {
      list.next = new ListNode(list1.val);
      list1 = list1.next;
    } else {
      list.next = new ListNode(list2.val);
      list2 = list2.next;
    }

    list = list.next;
  }

  // It's possible that one linked list is shorter than the other so we just
  // add on the remainder of the last linked list. It's already sorted :)
  if (list1 !== null) {
    list.next = list1;
  }
  if (list2 !== null) {
    list.next = list2;
  }

  return current.next;
}

// Input: list1 = [1,2,4], list2 = [1,3,4]
// Output: [1,1,2,3,4,4]
// const l1 = new ListNode(1);
// l1.next = new ListNode(2);
// l1.next.next = new ListNode(4);
// const l2 = new ListNode(1);
// l2.next = new ListNode(3);
// l2.next.next = new ListNode(4);

// const res = mergeTwoLists(l1, l2);
// console.log(res?.val); // 1
// console.log(res?.next?.val); //1
// console.log(res?.next?.next?.val); //2
// console.log(res?.next?.next?.next?.val); //3
// console.log(res?.next?.next?.next?.next?.val); //4
// console.log(res?.next?.next?.next?.next?.next?.val); //4
