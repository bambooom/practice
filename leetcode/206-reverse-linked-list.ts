export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// recursive, 1-2-3-4-5
function reverseList(head: ListNode | null): ListNode | null {
  if (!head) return null;
  if (!head.next) return head;
  let curr = head.next;
  head.next = null;
  const newHead = reverseList(curr);
  if (newHead) {
    curr = newHead;
    while (curr.next) {
      curr = curr.next;
    }
    curr.next = head;
  }
  return newHead;
}

// iterative
function reverseList2(head: ListNode | null): ListNode | null {
  if (!head) return null;
  if (!head.next) return head;
  let prev = null;
  let curr: ListNode | null = head;
  while (curr) {
    const tmp: ListNode | null = curr.next;
    curr.next = prev;
    prev = curr;
    curr = tmp;
  }
  return prev;
}
