// https://leetcode.com/problems/maximum-frequency-stack/

// Design a stack-like data structure to push elements to the stack and pop the most frequent element from the stack.

class FreqStack {
  private _stack: number[][];
  private _freq: { [key: number]: number };
  constructor() {
    this._stack = []; // ith item is the numbers with appears with freq i
    this._freq = {}; // key is the item number, value is the freq
  }

  push(val: number): void {
    this._freq[val] = (this._freq[val] || 0) + 1;
    const freq = this._freq[val];
    if (this._stack.length < freq) {
      this._stack.push([val]);
    } else {
      this._stack[freq - 1].push(val);
    }
    // console.log(this._stack);
    // console.log(this._freq);
  }

  pop(): number {
    // console.log(this._stack);
    // console.log(this._freq);
    const lastStack = this._stack[this._stack.length - 1];
    const result = lastStack.pop() as number;
    if (lastStack.length === 0) {
      this._stack.pop();
    }
    this._freq[result] -= 1;
    return result;
  }
}

/**
 * Your FreqStack object will be instantiated and called as such:
 * var obj = new FreqStack()
 * obj.push(val)
 * var param_2 = obj.pop()
 */

const freqStack = new FreqStack();
freqStack.push(5); // The stack is [5]
freqStack.push(7); // The stack is [5,7]
freqStack.push(5); // The stack is [5,7,5]
freqStack.push(7); // The stack is [5,7,5,7]
freqStack.push(4); // The stack is [5,7,5,7,4]
freqStack.push(5); // The stack is [5,7,5,7,4,5], _stack is [ [ 5, 7, 4 ], [ 5, 7 ], [ 5 ] ]
console.log(freqStack.pop()); // return 5, as 5 is the most frequent. The stack becomes [5,7,5,7,4].
console.log(freqStack.pop()); // return 7, as 5 and 7 is the most frequent, but 7 is closest to the top. The stack becomes [5,7,5,4].
console.log(freqStack.pop()); // return 5, as 5 is the most frequent. The stack becomes [5,7,4].
console.log(freqStack.pop()); // return 4, as 4, 5 and 7 is the most frequent, but 4 is closest to the top. The stack becomes [5,7].
