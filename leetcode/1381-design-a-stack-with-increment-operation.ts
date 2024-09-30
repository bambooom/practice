// https://leetcode.com/problems/design-a-stack-with-increment-operation

// Design a stack that supports increment operations on its elements.
// Implement the CustomStack class:
// - CustomStack(int maxSize) Initializes the object with maxSize which is the maximum number of elements in the stack.
// - void push(int x) Adds x to the top of the stack if the stack has not reached the maxSize.
// - int pop() Pops and returns the top of the stack or -1 if the stack is empty.
// - void inc(int k, int val) Increments the bottom k elements of the stack by val. If there are less than k elements in the stack, increment all the elements in the stack.

class CustomStack {
  maxSize: number;
  stack: number[] = [];
  constructor(maxSize: number) {
    this.maxSize = maxSize;
  }

  push(x: number): void {
    if (this.stack.length < this.maxSize) {
      this.stack.push(x);
    }
  }

  pop(): number {
    if (this.stack.length === 0) {
      return -1;
    }
    return this.stack.pop()!;
  }

  increment(k: number, val: number): void {
    for (let i = 0; i < k && i < this.stack.length; i++) {
      this.stack[i] += val;
    }
  }
}

/**
 * Your CustomStack object will be instantiated and called as such:
 * var obj = new CustomStack(maxSize)
 * obj.push(x)
 * var param_2 = obj.pop()
 * obj.increment(k,val)
 */
