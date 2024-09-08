// https://leetcode.com/problems/split-linked-list-in-parts
// Given the head of a singly linked list and an integer k, split the linked list into k consecutive linked list parts.
// The length of each part should be as equal as possible: no two parts should have a size differing by more than one. This may lead to some parts being null.
// The parts should be in the order of occurrence in the input list, and parts occurring earlier should always have a size greater than or equal to parts occurring later.
// Return an array of the k parts.

// Example1:
// Input: head = [1,2,3], k = 5
// Output: [[1],[2],[3],[],[]]
// Explanation:
// The first element output[0] has output[0].val = 1, output[0].next = null.
// The last element output[4] is null, but its string representation as a ListNode is [].

// Example 2:
// Input: head = [1,2,3,4,5,6,7,8,9,10], k = 3
// Output: [[1,2,3,4],[5,6,7],[8,9,10]]
// Explanation:
// The input has been split into consecutive parts with size difference at most 1, and earlier parts are a larger size than the later parts.

import { ListNode } from './util';

// https://leetcode.com/problems/split-linked-list-in-parts/solutions/4011352/typescript-concise-solution-intuition-complexity-beats-100/?envType=daily-question&envId=2024-09-08
//  think of it as distributing the elements of the linked list as evenly as possible among the k parts. If there's a remainder when dividing the total number of nodes by k, some parts will have one extra node compared to others.
function splitListToParts(
  head: ListNode | null,
  k: number,
): Array<ListNode | null> {
  // If empty list
  if (head === null) {
    return new Array(k).fill(null);
  }

  // Get number of nodes
  let count = 0;
  let curr: ListNode | null = head;

  while (curr) {
    count++;
    curr = curr.next;
  }

  // Calculate part lengths
  const quotient = Math.floor(count / k);
  const remainder = count % k;
  const result: ListNode[] = new Array(k).fill(null);

  curr = head;
  let prev = null;
  // Split into k parts
  for (let i = 0; curr && i < k; i++) {
    result[i] = curr;

    const partSize = quotient + (i < remainder ? 1 : 0);

    for (let j = 0; j < partSize; j++) {
      prev = curr;
      curr = curr!.next;
    }

    if (prev) {
      prev.next = null;
    }
  }

  return result;
}
