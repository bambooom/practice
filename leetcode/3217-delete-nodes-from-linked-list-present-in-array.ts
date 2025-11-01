// https://leetcode.com/problems/delete-nodes-from-linked-list-present-in-array
// You are given an array of integers nums and the head of a linked list. Return the head of the modified linked list after removing all nodes from the linked list that have a value that exists in nums.

// Example 1:
// Input: nums = [1,2,3], head = [1,2,3,4,5]
// Output: [4,5]

import { ListNode } from './util';

// hash set
// https://leetcode.com/problems/delete-nodes-from-linked-list-present-in-array/solutions/5743933/5-solutions-time-o-m-n-space-o-m/
// https://leetcode.com/problems/delete-nodes-from-linked-list-present-in-array/solutions/5746298/easy-on-solution-with-full-explanation-b-y8po/?envType=daily-question&envId=2025-11-01
function modifiedList(nums: number[], head: ListNode | null): ListNode | null {
  // convert nums array into a set for O(1) lookup
  const numSet = new Set(nums);
  // create a dummy node to simplify edge cases handling
  // the dummy node points to the head of the original list
  const dummy = new ListNode(0);
  dummy.next = head;

  // Initialize two pointers: `cur` for traversing the list,
  // and `prev` to keep track of the last valid node
  let cur = head;
  let prev = dummy;

  while (cur != null) {
    // If the current node's value is in the set, it needs to be removed
    if (numSet.has(cur.val)) {
      // Skip the current node by linking the previous node to the next node
      prev.next = cur.next;
    } else {
      prev = cur;
    }
    // Move the `cur` pointer to the next node in the list
    cur = cur.next;
  }

  // Return the modified list, starting from the node after the dummy
  return dummy.next;
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
