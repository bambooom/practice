// https://leetcode.com/problems/delete-nodes-from-linked-list-present-in-array
// You are given an array of integers nums and the head of a linked list. Return the head of the modified linked list after removing all nodes from the linked list that have a value that exists in nums.

// Example 1:
// Input: nums = [1,2,3], head = [1,2,3,4,5]
// Output: [4,5]

import { ListNode } from './util';

// hash set
// https://leetcode.com/problems/delete-nodes-from-linked-list-present-in-array/solutions/5743933/5-solutions-time-o-m-n-space-o-m/
function modifiedList(nums: number[], head: ListNode | null): ListNode | null {
  const numSet = new Set(nums);
  const root = new ListNode();

  let tail = root;
  while (head != null) {
    if (!numSet.has(head.val)) {
      tail.next = head;
      tail = head;
    }
    head = head.next;
  }
  tail.next = null;

  return root.next;
}

// sort + binary search, faster solution
function modifiedList2(nums: number[], head: ListNode | null): ListNode | null {
  const root = new ListNode(0, head);

  nums.sort((num1, num2) => num1 - num2);

  function binaryHas<T>(array: T[], value: T): boolean {
    let min = 0;
    let max = array.length;
    while (min < max) {
      const mid = min + ((max - min) >> 1);
      if (array[mid] < value) {
        min = mid + 1;
      } else if (array[mid] > value) {
        max = mid;
      } else {
        return true;
      }
    }
    return false;
  }

  head = root;
  while (head.next != null) {
    if (binaryHas(nums, head.next.val)) {
      head.next = head.next.next;
    } else {
      head = head.next;
    }
  }

  return root.next;
}
