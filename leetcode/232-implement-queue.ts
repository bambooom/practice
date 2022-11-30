// https://leetcode.com/problems/implement-queue-using-stacks/solution/
// Implement a first in first out (FIFO) queue using only two stacks.

class MyQueue {
  stackIn: number[];
  stackOut: number[];
  constructor() {
    this.stackIn = [];
    this.stackOut = [];
  }

  push(x: number): void {
    this.stackIn.push(x);
  }

  pop(): number {
    if (this.stackOut.length === 0) {
      while (this.stackIn.length) {
        this.stackOut.push(this.stackIn.pop() as number);
      }
    }
    return this.stackOut.pop() as number;
  }

  peek(): number {
    // Returns the element at the front of the queue.
    if (this.stackOut.length === 0) {
      while (this.stackIn.length) {
        this.stackOut.push(this.stackIn.pop() as number);
      }
    }
    return this.stackOut[this.stackOut.length - 1];
  }

  empty(): boolean {
    return this.stackIn.length === 0 && this.stackOut.length === 0;
  }
}

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * myQueue.push(1); // queue is: [1]
 * myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
 * myQueue.peek(); // return 1
 * myQueue.pop(); // return 1, queue is [2]
 * myQueue.empty(); // return false
 */
