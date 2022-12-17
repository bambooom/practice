// https://leetcode.com/problems/design-linked-list/

// Design your implementation of the linked list. You can choose to use a singly or doubly linked list.

import { ListNode } from './util';

class MyLinkedList {
  private _list: ListNode[];
  constructor() {
    this._list = [];
  }

  get(index: number): number {
    if (index < 0 || index >= this._list.length) {
      return -1;
    }
    return this._list[index].val;
  }

  addAtHead(val: number): void {
    const origHead = this._list[0];
    const newHead = new ListNode(val, origHead);
    this._list.unshift(newHead);
  }

  addAtTail(val: number): void {
    const origTail = this._list.at(-1);
    const newTail = new ListNode(val);
    if (origTail) {
      origTail.next = newTail;
    }
    this._list.push(newTail);
  }

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
