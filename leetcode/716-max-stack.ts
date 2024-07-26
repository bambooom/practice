// https://leetcode.com/problems/max-stack
// Design a max stack data structure that supports the stack operations and supports finding the stack's maximum element.

// https://leetcode.com/problems/max-stack/solutions/1098445/javascript-using-2-stacks/?envType=study-plan-v2&envId=premium-algo-100
// using 2 stacks, but will go time limit exceeded, as requirement: At most 10^5 calls will be made to push, pop, top, peekMax, and popMax.
class MaxStack {
  private stack: number[];
  private maxStack: number[];
  constructor() {
    this.stack = [];
    this.maxStack = [];
  }

  // Pushes element x onto the stack.
  push(x: number): void {
    this.stack.push(x);
    if (!this.maxStack.length) {
      this.maxStack.push(x);
    } else {
      this.maxStack.push(Math.max(x, this.peekMax()));
    }
  }
  // Removes the element on top of the stack and returns it.
  pop(): number {
    this.maxStack.pop();
    return this.stack.pop()!;
  }
  // Gets the element on the top of the stack without removing it.
  top(): number {
    return this.stack[this.stack.length - 1];
  }
  // Retrieves the maximum element in the stack without removing it.
  peekMax(): number {
    return this.maxStack[this.maxStack.length - 1];
  }
  // Retrieves the maximum element in the stack and removes it. If there is more than one maximum element, only remove the top-most one.
  popMax(): number {
    const buffer: number[] = [];
    const max = this.peekMax();
    while (this.top() !== max) {
      buffer.push(this.pop());
    }
    this.pop();
    while (buffer.length) {
      this.push(buffer.pop()!);
    }

    return max;
  }
}

/**
 * Your MaxStack object will be instantiated and called as such:
 * var obj = new MaxStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.peekMax()
 * var param_5 = obj.popMax()
 */

// Example 1:

// Input
// ["MaxStack", "push", "push", "push", "top", "popMax", "top", "peekMax", "pop", "top"]
// [[], [5], [1], [5], [], [], [], [], [], []]
// Output
// [null, null, null, null, 5, 5, 1, 5, 1, 5]

// Explanation
// MaxStack stk = new MaxStack();
// stk.push(5);   // [5] the top of the stack and the maximum number is 5.
// stk.push(1);   // [5, 1] the top of the stack is 1, but the maximum is 5.
// stk.push(5);   // [5, 1, 5] the top of the stack is 5, which is also the maximum, because it is the top most one.
// stk.top();     // return 5, [5, 1, 5] the stack did not change.
// stk.popMax();  // return 5, [5, 1] the stack is changed now, and the top is different from the max.
// stk.top();     // return 1, [5, 1] the stack did not change.
// stk.peekMax(); // return 5, [5, 1] the stack did not change.
// stk.pop();     // return 1, [5] the top of the stack and the max element is now 5.
// stk.top();     // return 5, [5] the stack did not change.

// accpetable solution using built-in MaxPriorityQueue
// https://github.com/datastructures-js/priority-queue/blob/master/src/maxPriorityQueue.d.ts
interface MaxPriorityQueue<T> {
  constructor(getCompareValue?: IGetCompareValue<T>, heap?: MaxHeap<T>);
  [Symbol.iterator](): Iterator<T, any, undefined>;
  size(): number;
  isEmpty(): boolean;
  front(): T;
  back(): T;
  enqueue(value: T): MaxPriorityQueue<T>;
  push(value: T): MaxPriorityQueue<T>;
  dequeue(): T;
  pop(): T;
  remove(cb: (value: T) => boolean): T[];
  contains(cb: (value: T) => boolean): boolean;
  toArray(): T[];
  clear(): void;
  static fromArray<T>(
    values: T[],
    getCompareValue?: IGetCompareValue<T>,
  ): MaxPriorityQueue<T>;
}

class MaxStack2 {
  private maxHeap;
  private stack: number[];
  private removedIndexes;
  constructor() {
    this.stack = [];
    this.maxHeap = new MaxPriorityQueue((a, b) => {
      b.value - a.value;
    });
    this.removedIndexes = new Set<number>();
  }

  push(x: number): void {
    this.stack.push(x);
    this.maxHeap.enqueue({ value: x, index: this.stack.length - 1 }, x);
  }

  pop(): number {
    let stackTopIndex = this.stack.length - 1;
    while (this.removedIndexes.has(stackTopIndex)) {
      stackTopIndex--;
    }
    this.removedIndexes.add(stackTopIndex);
    return this.stack[stackTopIndex];
  }

  top(): number {
    let stackTopIndex = this.stack.length - 1;
    while (this.removedIndexes.has(stackTopIndex)) {
      stackTopIndex--;
    }
    return this.stack[stackTopIndex];
  }

  peekMax(): number {
    let topMax = this.maxHeap.front().element;
    while (this.removedIndexes.has(topMax.index)) {
      this.maxHeap.dequeue();
      topMax = this.maxHeap.front().element;
    }
    return topMax.value;
  }

  popMax(): number {
    let topMax = this.maxHeap.dequeue().element;
    while (this.removedIndexes.has(topMax.index)) {
      topMax = this.maxHeap.dequeue().element;
    }
    this.removedIndexes.add(topMax.index);
    return topMax.value;
  }
}

/**
 * Your MaxStack object will be instantiated and called as such:
 * var obj = new MaxStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.peekMax()
 * var param_5 = obj.popMax()
 */
