// https://leetcode.com/problems/intersection-of-two-linked-lists/
// #hash-table #two-pointers

import { ListNode } from './util';

// hash table, time: O(N + M), space O(M)
function getIntersectionNode(
  headA: ListNode | null,
  headB: ListNode | null,
): ListNode | null {
  if (!headA || !headB) return null;
  const A = new Set<ListNode>();
  while (headA) {
    A.add(headA);
    headA = headA.next;
  }
  while (headB) {
    if (A.has(headB)) {
      return headB;
    }
    headB = headB.next;
  }
  return null;
}

// two pointers
// simpler algo:
// - Calculate N; the length of list A.
// - Calculate M; the length of list B.
// - Set the start pointer for the longer list, |M - N|.
// - Step the pointers through the list together to check whether nodes are the same.
// moreover, one can use one pointer that goes over a + c + b and the other that goes over b + c + a.
// which means, one pointer is essentially measuring the length of the longer list,
// and the other is measuring the length of the shorter list, and then placing the start pointer for the longer list.
// Then both are stepping through the list together

// im summary:
// - Set pointer pA to point at headA.
// - Set pointer pB to point at headB.
// - While pA and pB are not pointing at the same node:
//   - If pA is pointing to a null, set pA to point to headB.
//   - Else, set pA to point at pA.next.
//   - If pB is pointing to a null, set pB to point to headA.
//   - Else, set pB to point at pB.next.
// - return the value pointed to by pA (or by pB; they're the same now).

// not quite clear here
function getIntersectionNode2(
  headA: ListNode | null,
  headB: ListNode | null,
): ListNode | null {
  if (!headA || !headB) return null;
  let pA: ListNode | null = headA;
  let pB: ListNode | null = headB;
  while (pA !== pB) {
    if (pA === null) {
      pA = headB;
    } else {
      pA = pA.next;
    }
    if (pB === null) {
      pB = headA;
    } else {
      pB = pB.next;
    }
  }
  return pA;
}
