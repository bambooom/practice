// https://leetcode.com/problems/design-circular-deque/
// Design your implementation of the circular double-ended queue (deque).
// what is Circular Queue Data Structure:
// https://www.programiz.com/dsa/circular-queue

class MyCircularDeque {
  private k: number;
  private queue: number[];
  // Initializes the deque with a maximum size of k.
  constructor(k: number) {
    this.k = k;
    this.queue = [];
    // this.head = -1;
    // this.tail = -1;
  }
  // Adds an item at the front of Deque. Returns true if the operation is successful, or false otherwise.
  insertFront(value: number): boolean {
    if (this.isFull()) return false;
    // if (this.head === -1) {
    //   this.head = 0;
    //   this.tail = 0;
    // } else {
    //   this.tail = (this.tail + 1) % this.k;
    // }
    this.queue.unshift(value);
    return true;
  }
  // Adds an item at the rear of Deque. Returns true if the operation is successful, or false otherwise.
  insertLast(value: number): boolean {
    if (this.isFull()) return false;
    this.queue.push(value);
    return true;
  }
  // Deletes an item from the front of Deque. Returns true if the operation is successful, or false otherwise.
  deleteFront(): boolean {
    if (this.isEmpty()) return false;
    this.queue.shift();
    return true;
  }
  // Deletes an item from the rear of Deque. Returns true if the operation is successful, or false otherwise.
  deleteLast(): boolean {
    if (this.isEmpty()) return false;
    this.queue.pop();
    return true;
  }
  // Returns the front item from the Deque. Returns -1 if the deque is empty.
  getFront(): number {
    if (this.isEmpty()) return -1;
    return this.queue[0];
  }
  // Returns the last item from Deque. Returns -1 if the deque is empty.
  getRear(): number {
    if (this.isEmpty()) return -1;
    return this.queue[this.queue.length - 1];
  }
  // Returns true if the deque is empty, or false otherwise.
  isEmpty(): boolean {
    return this.queue.length === 0;
  }
  // Returns true if the deque is full, or false otherwise.
  isFull(): boolean {
    return this.queue.length === this.k;
  }
}

/**
 * Your MyCircularDeque object will be instantiated and called as such:
 * var obj = new MyCircularDeque(k)
 * var param_1 = obj.insertFront(value)
 * var param_2 = obj.insertLast(value)
 * var param_3 = obj.deleteFront()
 * var param_4 = obj.deleteLast()
 * var param_5 = obj.getFront()
 * var param_6 = obj.getRear()
 * var param_7 = obj.isEmpty()
 * var param_8 = obj.isFull()
 */
