// https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/
// #two-pointers
import { ListNode } from './util';
function deleteDuplicates(head: ListNode | null): ListNode | null {
  if (!head) return null;
  let cur: ListNode | null = head;
  const newHead = new ListNode(-200); // fake head
  let prev: ListNode = newHead; // set fake as the new head, and return newHead.next
  prev.next = head; // initialize fake.next = head
  while (cur) {
    if (cur.next && cur.val === cur.next.val) {
      while (cur.next && cur.val === cur.next.val) {
        cur = cur.next;
      }
      prev.next = cur.next;
    } else {
      prev = prev.next as ListNode;
    }
    cur = cur.next;
  }
  return newHead.next;
}
