// https://leetcode.com/problems/design-circular-queue

// Design your implementation of the circular queue. The circular queue is a linear data structure in which the operations are performed based on FIFO (First In First Out) principle, and the last position is connected back to the first position to make a circle. It is also called "Ring Buffer".

class MyCircularQueue {
  private queue: Array<number>;
  private length: number;
  private size: number;
  private head: number;
  private tail: number;
  // Initializes the object with the size of the queue to be k
  constructor(k: number) {
    this.queue = new Array(k);
    this.length = k;
    this.size = 0;
    this.head = this.tail = 0; // the tail is behind the last element
  }

  // Inserts an element into the circular queue. Return true if the operation is successful.
  enQueue(value: number): boolean {
    if (this.isFull()) return false;
    this.size++;
    this.queue[this.tail] = value;
    this.tail = (this.tail + 1) % this.length;
    return true;
  }
  // Deletes an element from the circular queue. Return true if the operation is successful.
  deQueue(): boolean {
    if (this.isEmpty()) return false;
    this.size--;
    this.head = (this.head + 1) % this.length;
    return true;
  }

  // Gets the front item from the queue. If the queue is empty, return -1
  Front(): number {
    if (this.isEmpty()) return -1;
    return this.queue[this.head];
  }
  // Gets the last item from the queue. If the queue is empty, return -1.
  Rear(): number {
    if (this.isEmpty()) return -1;
    const index = (this.tail + this.length - 1) % this.length;
    return this.queue[index];
  }
  // Checks whether the circular queue is empty or not.
  isEmpty(): boolean {
    return this.size === 0;
  }
  // Checks whether the circular queue is full or not.
  isFull(): boolean {
    return this.size === this.length;
  }
}

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */
