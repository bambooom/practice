// https://leetcode.com/problems/minimum-cost-to-connect-sticks/
// #heap

// Input: sticks = [2,4,3]
// Output: 14
// Explanation: You start with sticks = [2,4,3].
// 1. Combine sticks 2 and 3 for a cost of 2 + 3 = 5. Now you have sticks = [5,4].
// 2. Combine sticks 5 and 4 for a cost of 5 + 4 = 9. Now you have sticks = [9].
// There is only one stick left, so you are done. The total cost is 5 + 9 = 14.

// we need to combine smallest sticks each time
// when we combined the sticks we add it to the combined arr
function connectSticks(sticks: number[]): number {
  if (sticks.length <= 1) return 0;
  // sorting at the beginning
  sticks.sort((a, b) => a - b);
  const combined = [];
  let res = 0;
  while (sticks.length || combined.length > 1) {
    let curSum = 0;
    // we need to sticks to combine => counter is 2
    let counter = 2;
    while (counter--) {
      // if we have original stick and it is less than first combined -> take original
      const condition =
        sticks.length && (!combined.length || sticks[0] < combined[0]);
      // add to curSum and remove first from either combined or original sticks array
      curSum += condition
        ? (sticks.shift() as number)
        : (combined.shift() as number);
    }
    // add to result and add the stick that we combined to combined array
    res += curSum;
    combined.push(curSum);
  }
  return res;
}

// general heap solution
class Heap {
  private heap: number[];
  private isMax: boolean;
  constructor(nums: number[], max = true) {
    this.heap = [];
    this.isMax = max;
    nums.forEach((n) => this.add(n));
  }

  add(n: number): void {
    this.heap.push(n * (this.isMax ? 1 : -1));

    this.bubbleUp();
  }

  getParent = (i: number): number => Math.floor((i - 1) / 2);

  swap = (a: number, b: number): void => {
    if (a !== b) {
      const tmp = this.heap[a];
      this.heap[a] = this.heap[b];
      this.heap[b] = tmp;
    }
  };

  bubbleUp(): void {
    if (this.heap.length < 2) return;

    let cur = this.heap.length - 1;
    let parent = this.getParent(cur);
    while (this.heap[cur] > this.heap[parent]) {
      this.swap(cur, parent);
      cur = parent;
      parent = this.getParent(cur);
    }
  }

  length(): number {
    return this.heap.length;
  }

  remove(): number {
    const result = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.pop();

    this.sinkDown();

    return result * (this.isMax ? 1 : -1);
  }

  showTop(): number {
    return this.heap[0] * (this.isMax ? 1 : -1);
  }

  sinkDown(): void {
    let cur = 0;
    let left = cur * 2 + 1;
    let right = cur * 2 + 2;
    const isValid = (i) => i < this.heap.length && i >= 0;

    let swapLeft = isValid(left) && this.heap[cur] < this.heap[left];
    let swapRight = isValid(right) && this.heap[cur] < this.heap[right];

    while (swapLeft || swapRight) {
      if (swapLeft && swapRight) {
        if (this.heap[left] > this.heap[right]) {
          this.swap(left, cur);
          cur = left;
        } else {
          this.swap(right, cur);
          cur = right;
        }
      } else {
        if (swapLeft) {
          this.swap(left, cur);
          cur = left;
        } else {
          this.swap(right, cur);
          cur = right;
        }
      }

      left = cur * 2 + 1;
      right = cur * 2 + 2;
      swapLeft = isValid(left) && this.heap[cur] < this.heap[left];
      swapRight = isValid(right) && this.heap[cur] < this.heap[right];
    }
  }
}

/**
 * @param {number[]} sticks
 * @return {number}
 */
function connectSticks2(sticks: number[]): number {
  const n = sticks.length;
  if (n === 1) return 0;

  let res = 0;

  const heap = new Heap(sticks, false);
  while (heap.length() > 1) {
    const st1 = heap.remove();
    const st2 = heap.remove();
    res = res + st1 + st2;
    heap.add(st1 + st2);
  }

  return res;
}
