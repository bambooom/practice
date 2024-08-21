// https://leetcode.com/problems/design-linked-list/

// Design your implementation of the linked list. You can choose to use a singly or doubly linked list.

import { ListNode } from './util';

class MyLinkedList {
  private _list: ListNode[];
  constructor() {
    this._list = [];
  }

  // Get the value of the index-th node in the linked list. If the index is invalid, return -1.
  get(index: number): number {
    if (index < 0 || index >= this._list.length) {
      return -1;
    }
    return this._list[index].val;
  }

  // Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list.
  addAtHead(val: number): void {
    const origHead = this._list[0];
    const newHead = new ListNode(val, origHead);
    this._list.unshift(newHead);
  }

  // Append a node of value val as the last element of the linked list.
  addAtTail(val: number): void {
    const origTail = this._list.at(-1);
    const newTail = new ListNode(val);
    if (origTail) {
      origTail.next = newTail;
    }
    this._list.push(newTail);
  }

  // Add a node of value val before the index-th node in the linked list. If index equals the length of the linked list, the node will be appended to the end of the linked list. If index is greater than the length, the node will not be inserted.
  // 在中间插入
  addAtIndex(index: number, val: number): void {
    if (index === 0) {
      this.addAtHead(val);
      return;
    } else if (index === this._list.length) {
      this.addAtTail(val);
      return;
    } else if (index > this._list.length) {
      return;
    }
    const origNode = this._list[index];
    const newNode = new ListNode(val, origNode);
    const prevNode = this._list[index - 1];
    prevNode.next = newNode;
    this._list.splice(index, 0, newNode);
  }

  // Delete the index-th node in the linked list, if the index is valid.
  deleteAtIndex(index: number): void {
    if (index < 0 || index >= this._list.length) {
      return;
    } else if (index === 0) {
      this._list.shift();
    } else {
      const prev = this._list[index - 1];
      const after =
        index + 1 === this._list.length ? null : this._list[index + 1];
      prev.next = after;
      this._list.splice(index, 1);
    }
  }
}

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */

// Example 1:
// Input
// ["MyLinkedList", "addAtHead", "addAtTail", "addAtIndex", "get", "deleteAtIndex", "get"]
// [[], [1], [3], [1, 2], [1], [1], [1]]
// Output
// [null, null, null, null, 2, null, 3]

// Explanation
// MyLinkedList myLinkedList = new MyLinkedList();
// myLinkedList.addAtHead(1);
// myLinkedList.addAtTail(3);
// myLinkedList.addAtIndex(1, 2);    // linked list becomes 1->2->3
// myLinkedList.get(1);              // return 2
// myLinkedList.deleteAtIndex(1);    // now the linked list is 1->3
// myLinkedList.get(1);              // return 3

// https://leetcode.com/problems/design-linked-list/solutions/1146158/simple-typescript-solution-single-linked-list/?envType=study-plan-v2&envId=programming-skills
// single-linked list
interface SingleListNode {
  val: number;
  next: SingleListNode | null;
}

class MyLinkedListSingle {
  head: SingleListNode | null;
  size: number;

  constructor() {
    this.head = null;
    this.size = 0;
  }

  getNode(index: number): SingleListNode | null {
    if (index < 0 || index >= this.size) return null;
    let count = 0;
    let node: SingleListNode | null = this.head;
    while (count < index && node) {
      node = node.next;
      count++;
    }
    return node;
  }

  get(index: number): number {
    const node = this.getNode(index);
    if (!node) return -1;
    return node.val;
  }

  addAtHead(val: number): void {
    const next = this.head;
    this.head = { val, next };
    this.size++;
  }

  addAtTail(val: number): void {
    if (this.size === 0) {
      this.addAtHead(val);
      return;
    }
    const node = this.getNode(this.size - 1)!;
    node.next = { val, next: null };
    this.size++;
  }

  addAtIndex(index: number, val: number): void {
    if (index < 0 || index > this.size) return;
    if (index === this.size) {
      this.addAtTail(val);
      return;
    }
    if (index === 0) {
      this.addAtHead(val);
      return;
    }
    const node = this.getNode(index - 1)!;
    node.next = { val, next: node.next };
    this.size++;
  }

  deleteAtIndex(index: number): void {
    if (index < 0 || index >= this.size) return;
    if (this.size === 0) return;
    if (index === 0 && this.head) {
      this.head = this.head.next;
      this.size--;
      return;
    }
    const node = this.getNode(index - 1)!;
    node.next = node.next?.next || null;
    this.size--;
  }
}

// https://leetcode.com/problems/design-linked-list/solutions/2910657/typescript-doubly-linked-list-with-sentinel/?envType=study-plan-v2&envId=programming-skills
// doubly linked list
class DLNode {
  public val: number;
  public prev: DLNode;
  public next: DLNode;

  constructor(val: number, prev?: DLNode, next?: DLNode) {
    this.val = val;
    this.prev = prev ?? this;
    this.next = next ?? this;
  }
}

class MyLinkedListDouble {
  private sentinel: DLNode;
  private size: number;

  constructor() {
    this.sentinel = new DLNode(42);
    this.size = 0;
  }

  private getNode(index: number): DLNode {
    // if index equals -1, sentinel will be returned
    const forward = index <= this.size / 2;
    let n = index <= this.size / 2 ? index + 1 : this.size - index;
    let p = this.sentinel;

    while (n > 0) {
      p = forward ? p.next : p.prev;
      n -= 1;
    }

    return p;
  }

  get(index: number): number {
    if (index < 0 || index > this.size - 1) {
      return -1;
    }

    return this.getNode(index).val;
  }

  addAtHead(val: number): void {
    this.addAtIndex(0, val);
  }

  addAtTail(val: number): void {
    this.addAtIndex(this.size, val);
  }

  addAtIndex(index: number, val: number): void {
    if (index < 0 || index > this.size) {
      return;
    }

    const parent = this.getNode(index - 1);
    const oldNext = parent.next;
    parent.next = new DLNode(val, parent, oldNext);
    oldNext.prev = parent.next;
    this.size += 1;
  }

  deleteAtIndex(index: number): void {
    if (index < 0 || index > this.size - 1) {
      return;
    }

    const parent = this.getNode(index - 1);
    const next = parent.next.next;
    parent.next = next;
    next.prev = parent;
    this.size -= 1;
  }
}
