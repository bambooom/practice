import { ListNode, mergeTwoLists } from '../leetcode/021-merge-sorted-list';

describe('merge 2 sorted list', () => {
  const l1 = new ListNode(1);
  l1.next = new ListNode(2);
  l1.next.next = new ListNode(4);
  const l2 = new ListNode(1);
  l2.next = new ListNode(3);
  l2.next.next = new ListNode(4);

  const sorted = mergeTwoLists(l1, l2);

  test('merged list result is correct [1,1,2,3,4,4]', () => {
    expect(sorted).toBeInstanceOf(ListNode);
    expect(sorted?.val).toBe(1);
    expect(sorted?.next?.val).toBe(1);
    expect(sorted?.next?.next?.val).toBe(2);
    expect(sorted?.next?.next?.next?.val).toBe(3);
    expect(sorted?.next?.next?.next?.next?.val).toBe(4);
    expect(sorted?.next?.next?.next?.next?.next?.val).toBe(4);
  });
});
