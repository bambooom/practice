// Given the head of a singly linked list, return the middle node of the linked list.
// If there are two middle nodes, return the second middle node.

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// Input: head = [1,2,3,4,5]
// Output: [3,4,5]
// Explanation: The middle node of the list is node 3.

// Input: head = [1,2,3,4,5,6]
// Output: [4,5,6]
// Explanation: Since the list has two middle nodes with values 3 and 4, we return the second one.

// Approach 1: output to array
// Space O(n), Time O(n)
function middleNode(head: ListNode | null): ListNode | null {
  const A = [head];

  while ((A[A.length - 1] as ListNode).next !== null) {
    A.push((A[A.length - 1] as ListNode).next);
  }
  return A[Math.trunc(A.length / 2)];
}

// Approach 2: fast and slow pointer, see also Q234
function middleNode2(head: ListNode | null): ListNode | null {
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;

  while (fast && fast?.next !== null) {
    slow = slow?.next as ListNode | null;
    fast = fast?.next.next as ListNode | null;
  }
  return slow;
}
