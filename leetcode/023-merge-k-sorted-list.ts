// https://leetcode.com/problems/merge-k-sorted-lists/
// #heap #merge-sort
// You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.
// Merge all the linked-lists into one sorted linked-list and return it.

// Input: lists = [[1,4,5],[1,3,4],[2,6]]
// Output: [1,1,2,3,4,4,5,6]
// Explanation: The linked-lists are:
// [
//   1->4->5,
//   1->3->4,
//   2->6
// ]
// merging them into one sorted list:
// 1->1->2->3->4->4->5->6

import { ListNode } from './util';

// https://leetcode.com/problems/merge-k-sorted-lists/solutions/800817/javascript-3-clean-solutions/
// Solution 1: Append the minimum node at each round
const mergeKLists1 = function (lists: Array<ListNode | null>): ListNode | null {
  const dummyHead = new ListNode();
  let curr: ListNode = dummyHead;

  function findMin(arr: Array<ListNode | null>) {
    let min = Infinity;

    for (const node of arr) {
      if (!node) continue;
      min = Math.min(min, node.val);
    }
    return min;
  }

  while (true) {
    const min = findMin(lists);
    if (min === Infinity) return dummyHead.next;

    for (let i = 0; i < lists.length; i++) {
      if (!lists[i] || (lists[i] as ListNode).val > min) continue;
      curr.next = lists[i] as ListNode;
      curr = curr.next;
      lists[i] = (lists[i] as ListNode).next;
    }
  }
};
// Solution 2: Divide and conquer
const mergeKLists2 = function (lists: Array<ListNode | null>): ListNode | null {
  if (!lists.length) return null;

  function merge(
    left: ListNode | null,
    right: ListNode | null,
  ): ListNode | null {
    if (!left) return right;
    if (!right) return left;

    if (left.val < right.val) {
      left.next = merge(left.next, right);
      return left;
    }
    right.next = merge(left, right.next);
    return right;
  }

  function recurse(start: number, end: number): ListNode | null {
    if (start === end) return lists[start];
    const mid = Math.floor((start + end) / 2);
    const left = recurse(start, mid);
    const right = recurse(mid + 1, end);
    return merge(left, right);
  }
  return recurse(0, lists.length - 1);
};

// Solution: Merge 2 lists at a time
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  if (!lists.length) return null;

  function mergeTwoLists(a: ListNode, b: ListNode) {
    const dummyHead = new ListNode();
    let curA: ListNode | null = a,
      curB: ListNode | null = b,
      curD: ListNode | null = dummyHead;

    while (curA && curB) {
      if (curA.val < curB.val) {
        curD.next = curA;
        curA = curA.next;
      } else {
        curD.next = curB;
        curB = curB.next;
      }
      curD = curD.next;
    }
    if (curA) curD.next = curA;
    if (curB) curD.next = curB;
    return dummyHead.next;
  }

  while (lists.length > 1) {
    const a = lists.shift();
    const b = lists.shift();
    const res = mergeTwoLists(a, b);
    lists.push(res);
  }
  return lists[0];
}

// using heap
// https://leetcode.com/problems/merge-k-sorted-lists/solutions/10617/javascript-o-n-log-k-time-and-o-k-space-using-min-heap/

class Heap {
  constructor(comparator) {
    this.data = [];
    this.comparator = comparator || ((parent, child) => parent - child);
  }

  get size() {
    return this.data.length;
  }

  bubbleUp(c) {
    if (c === 0) return;
    const p = Math.floor((c + 1) / 2) - 1;
    if (this.comparator(this.data[p], this.data[c]) > 0) {
      [this.data[p], this.data[c]] = [this.data[c], this.data[p]];
    }
    this.bubbleUp(p);
  }

  bubbleDown(p) {
    const c = 2 * (p + 1) - 1;
    if (c >= this.data.length) return;

    const leftDelta = this.comparator(this.data[p], this.data[c]);
    const rightDelta =
      c + 1 >= this.data.length
        ? 0
        : this.comparator(this.data[p], this.data[c + 1]);
    if (leftDelta <= 0 && rightDelta <= 0) return;

    const swapChildIndex = c + (leftDelta <= rightDelta);
    [this.data[p], this.data[swapChildIndex]] = [
      this.data[swapChildIndex],
      this.data[p],
    ];
    this.bubbleDown(swapChildIndex);
  }

  add(val) {
    this.data.push(val);
    this.bubbleUp(this.data.length - 1);
  }

  poll() {
    if (this.size < 2) return this.data.pop();
    [this.data[0], this.data[this.size - 1]] = [
      this.data[this.size - 1],
      this.data[0],
    ];
    const val = this.data.pop();
    this.bubbleDown(0);
    return val;
  }
}

const mergeKLists3 = function (lists) {
  if (!lists.length) return null;

  const minHeap = new Heap((parent, child) => parent.val - child.val);
  for (const node of lists) {
    if (node) minHeap.add(node);
  }

  const dummy = new ListNode();
  let tail = dummy;
  while (minHeap.size) {
    tail.next = minHeap.poll();
    tail = tail.next;
    if (tail.next) minHeap.add(tail.next);
  }

  return dummy.next;
};
