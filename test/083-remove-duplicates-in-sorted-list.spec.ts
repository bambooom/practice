import {
  ListNode,
  deleteDuplicates,
} from '../leetcode/083-remove-duplicates-in-sorted-list';

describe('delete duplicates in sorted list', () => {
  const l1 = new ListNode(1);
  l1.next = new ListNode(1);
  l1.next.next = new ListNode(3);
  l1.next.next.next = new ListNode(4);
  l1.next.next.next.next = new ListNode(4);
  // [1,1,3,4,4]  => [1,3,4]

  const sorted = deleteDuplicates(l1);

  test('after remove duplicate is [1,3,4]', () => {
    expect(sorted).toBeInstanceOf(ListNode);
    expect(sorted?.val).toBe(1);
    expect(sorted?.next?.val).toBe(3);
    expect(sorted?.next?.next?.val).toBe(4);
  });
});
