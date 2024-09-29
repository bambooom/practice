//https://leetcode.com/problems/all-oone-data-structure
// Design a data structure to store the strings' count with the ability to return the strings with minimum and maximum counts.

// https://leetcode.com/problems/all-oone-data-structure/solutions/5845755/typescript-approach-o-n-space-o-1-time/?envType=daily-question&envId=2024-09-29
class SNode {
  count: number;
  keys: Set<string>;
  prev: SNode | null;
  next: SNode | null;

  constructor(count: number) {
    this.count = count;
    this.keys = new Set();
    this.prev = null;
    this.next = null;
  }
}

class AllOne {
  private keyCount: Map<string, number>; // hash map to store the current count for each string
  private countNodes: Map<number, SNode>; // hash map to keep track of all keys that share the same count, e.g. { 2: Set("apple"), 3: Set("banana") }
  private head: SNode; // doubly linked list for min/max, store the counts in ascending order
  private tail: SNode;

  constructor() {
    this.keyCount = new Map();
    this.countNodes = new Map();

    this.head = new SNode(0);
    this.tail = new SNode(0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  private addNodeAfter(prevNode: SNode, count: number): SNode {
    const newNode = new SNode(count);
    newNode.next = prevNode.next;
    newNode.prev = prevNode;
    prevNode.next!.prev = newNode;
    prevNode.next = newNode;
    this.countNodes.set(count, newNode);
    return newNode;
  }

  private removeNodeIfEmpty(node: SNode): void {
    if (node.keys.size === 0) {
      node.prev!.next = node.next;
      node.next!.prev = node.prev;
      this.countNodes.delete(node.count);
    }
  }

  // Increments the count of the string key by 1. If key does not exist in the data structure, insert it with count 1
  inc(key: string): void {
    const currentCount = this.keyCount.get(key) || 0;
    const newCount = currentCount + 1;

    this.keyCount.set(key, newCount);

    const currentNode = this.countNodes.get(currentCount);
    let newNode = this.countNodes.get(newCount);

    if (!newNode) {
      newNode = this.addNodeAfter(currentNode || this.head, newCount);
    }

    newNode.keys.add(key);

    if (currentNode) {
      currentNode.keys.delete(key);
      this.removeNodeIfEmpty(currentNode);
    }
  }

  // Decrements the count of the string key by 1. If the count of key is 0 after the decrement, remove it from the data structure. It is guaranteed that key exists in the data structure before the decrement.
  dec(key: string): void {
    const currentCount = this.keyCount.get(key);

    if (!currentCount) return;

    if (currentCount === 1) {
      this.keyCount.delete(key);
    } else {
      this.keyCount.set(key, currentCount - 1);
    }

    const currentNode = this.countNodes.get(currentCount);
    const newCount = currentCount - 1;
    let newNode = this.countNodes.get(newCount);

    if (newCount > 0 && !newNode) {
      newNode = this.addNodeAfter(currentNode!.prev!, newCount);
    }

    if (newNode) {
      newNode.keys.add(key);
    }

    currentNode!.keys.delete(key);
    this.removeNodeIfEmpty(currentNode!);
  }

  // Returns one of the keys with the maximal count. If no element exists, return an empty string ""
  getMaxKey(): string {
    return this.tail.prev !== this.head
      ? Array.from(this.tail.prev!.keys)[0]
      : '';
  }

  // Returns one of the keys with the minimum count. If no element exists, return an empty string "".
  getMinKey(): string {
    return this.head.next !== this.tail
      ? Array.from(this.head.next!.keys)[0]
      : '';
  }
}

/**
 * Your AllOne object will be instantiated and called as such:
 * var obj = new AllOne()
 * obj.inc(key)
 * obj.dec(key)
 * var param_3 = obj.getMaxKey()
 * var param_4 = obj.getMinKey()
 */

// Example 1:

// Input
// ["AllOne", "inc", "inc", "getMaxKey", "getMinKey", "inc", "getMaxKey", "getMinKey"]
// [[], ["hello"], ["hello"], [], [], ["leet"], [], []]
// Output
// [null, null, null, "hello", "hello", null, "hello", "leet"]

// Explanation
// AllOne allOne = new AllOne();
// allOne.inc("hello");
// allOne.inc("hello");
// allOne.getMaxKey(); // return "hello"
// allOne.getMinKey(); // return "hello"
// allOne.inc("leet");
// allOne.getMaxKey(); // return "hello"
// allOne.getMinKey(); // return "leet"
