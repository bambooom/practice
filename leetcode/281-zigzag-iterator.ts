// https://leetcode.com/problems/zigzag-iterator/
// Given two vectors of integers v1 and v2, implement an iterator to return their elements alternately.

// Implement the ZigzagIterator class:
// ZigzagIterator(List<int> v1, List<int> v2) initializes the object with the two vectors v1 and v2.
// boolean hasNext() returns true if the iterator still has elements, and false otherwise.
// int next() returns the current element of the iterator and moves the iterator to the next element.

// Example 1:
// Input: v1 = [1,2], v2 = [3,4,5,6]
// Output: [1,3,2,4,5,6]
// Explanation: By calling next repeatedly until hasNext returns false, the order of elements returned by next should be: [1,3,2,4,5,6].

class ZigzagIterator {
  queue: (number | number[])[][];
  constructor(v1: number[], v2: number[]) {
    this.queue = [];

    if (v1.length > 0) {
      this.queue.push([v1, 0]);
    }
    if (v2.length > 0) {
      this.queue.push([v2, 0]);
    }
  }

  next(): number {
    const [arr, index] = this.queue.shift()! as [number[], number];
    const value = arr[index];

    if (index < arr.length - 1) {
      this.queue.push([arr, index + 1]);
    }

    return value;
  }

  hasNext(): boolean {
    return this.queue.length > 0;
  }
}

/**
 * Your ZigzagIterator will be instantiated and called as such:
 * var i = new ZigzagIterator(v1, v2), a = [];
 * while (i.hasNext()) a.push(i.next());
 */
