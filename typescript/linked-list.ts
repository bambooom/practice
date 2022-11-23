/**
 * Implement a doubly linked list.  https://en.wikipedia.org/wiki/Linked_list
 *
 * Like an array, a linked list is a simple linear data structure.
 * Several common data types can be implemented using linked lists, like queues, stacks, and associative arrays.
 *
 * A linked list is a collection of data elements called nodes.
 * In a singly linked list each node holds a value and a link to the next node.
 * In a doubly linked list each node also holds a link to the previous node.
 */

export class ListNode<T> {
  val: T;
  next: ListNode<T> | null;
  pre: ListNode<T> | null;
  constructor(val: T, pre?: ListNode<T> | null, next?: ListNode<T> | null) {
    this.val = val;
    this.pre = pre === undefined ? null : pre;
    this.next = next === undefined ? null : next;
  }
}

export class LinkedList<T> {
  // head: ListNode | null;
  // tail: ListNode | null;
  // length: number;
  private nodes: ListNode<T>[];

  constructor() {
    this.nodes = [];
  }
  // insert value at back
  public push(element: T) {
    const len = this.nodes.length;
    const prevNode = this.nodes[len - 1] || null;
    const node = new ListNode(element, prevNode);

    if (prevNode) prevNode.next = node;
    this.nodes.push(node);
  }

  // remove value at back
  public pop(): T | undefined {
    const last = this.nodes.pop();
    if (this.nodes.length > 0) {
      this.nodes[this.nodes.length - 1].next = null;
    }

    return last?.val;
  }

  // remove value at front
  public shift(): T | undefined {
    const first = this.nodes.shift();
    if (this.nodes.length) {
      this.nodes[0].pre = null;
    }

    return first?.val;
  }

  // insert value at front
  public unshift(element: T) {
    const nextNode = this.nodes[0];
    const node = new ListNode(element, null, nextNode);
    if (nextNode) nextNode.pre = node;
    this.nodes.unshift(node);
  }

  public delete(element: T) {
    const idx = this.nodes.findIndex((node) => node.val === element);
    if (idx > -1) {
      const prevNode = idx > 0 ? this.nodes[idx - 1] : null;
      const nextNode = this.nodes[idx + 1];
      if (prevNode) prevNode.next = nextNode;
      if (nextNode) nextNode.pre = prevNode;
      this.nodes.splice(idx, 1);
    }
  }

  public count(): number {
    return this.nodes.length;
  }
}
