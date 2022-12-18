// https://leetcode.com/problems/min-stack/
// Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
// You must implement a solution with O(1) time complexity for each function.

class MinStack {
  private _stack: { val: number; min: number }[];
  private _min: number;
  constructor() {
    this._stack = [];
    this._min = Number.MAX_SAFE_INTEGER;
  }

  // pushes the element val onto the stack.
  push(val: number): void {
    this._stack.push({
      val,
      min: this._min,
    });
    this._min = Math.min(this._min, val);
  }

  // removes the element on the top of the stack.
  pop(): void {
    if (this._stack.length) {
      const { min } = this._stack.pop() as { val: number; min: number };
      this._min = min;
    }
  }

  // gets the top element of the stack.
  top(): number {
    return this._stack[this._stack.length - 1].val;
  }

  // retrieves the minimum element in the stack.
  getMin(): number {
    return this._min;
  }
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
