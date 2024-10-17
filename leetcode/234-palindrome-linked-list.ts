// https://leetcode.com/problems/palindrome-linked-list/
// Given the head of a singly linked list, return true if it is a palindrome or false otherwise.

// Example 1:
// Input: head = [1,2,2,1]
// Output: true

// Example 2:
// Input: head = [1,2]
// Output: false

import { ListNode } from './util';

// Copy into Array List and then Use Two Pointer Technique
// time: O(n), space O(n)
function isPalindrome(head: ListNode | null): boolean {
  if (!head) return false;
  const list = [head.val];
  while (head.next) {
    head = head.next;
    list.push(head.val);
  }
  // check array palindrome by 2 pointers
  let left = 0,
    right = list.length - 1;
  while (left < right) {
    if (list[left] !== list[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

// Reverse Second Half In-place
// space O(1)
// steps:
// Find the end of the first half.
// Reverse the second half.
// Determine whether or not there is a palindrome.
// Restore the list.
// Return the result.

const isPalindrome2 = function (head: ListNode | null): boolean {
  // lists with 0 or 1 node will automatically be palindrome
  if (head == null || head.next == null) return true;
  // add two indices, slow will eventually point to the mid node of the palindrome
  let slow: ListNode | null = head;
  // fast is a helper, it will be assigned some conditions to help make sure that slow point to the mid node
  let fast = head;

  // both slow and fast point to first node at the beginning
  // while both of the next two nodes of fast exist, slow takes 1 step and fast takes 2 steps forward
  // in this way, slow will definately point to the mid node
  // (or the first of the 2 mid nodes if there are even number of nodes in the list) at the end of the loop
  while (fast.next != null && fast.next.next != null) {
    slow = slow.next as ListNode;
    fast = fast.next.next;
  }

  // reverse all the ndoes after the slow node, then assign the reversed list back to it
  slow.next = reverseList(slow.next);
  slow = slow.next;

  // after the reverse, compare the reverse list with the original list from the beginning
  while (slow != null) {
    // if any pair of nodes are not equal, return false
    if (head?.val != slow.val) return false;
    head = head.next;
    slow = slow.next;
  }
  return true;
};

const reverseList = function (head: ListNode | null): ListNode | null {
  // pre will hold the reversed list
  let pre = null;
  // next will be a temporary variable to store the remaining nodes in the list at each loop
  let next = null;

  // while there are nodes remaining in the list
  while (head != null) {
    // temporarily store the remaining list without the current node
    next = head.next;
    // take the current node of the list, append the reversed nodes to it, then assign it back to the reversed list
    head.next = pre;
    pre = head;
    // assign the remaining list back so head points to the new current node, repeat until there are nodes remaining in the list
    head = next;
  }

  return pre;
};
