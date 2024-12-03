// https://leetcode.com/problems/find-median-from-data-stream
// The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

// For example, for arr = [2,3,4], the median is 3.
// For example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.
// Implement the MedianFinder class:

// MedianFinder() initializes the MedianFinder object.
// void addNum(int num) adds the integer num from the data stream to the data structure.
// double findMedian() returns the median of all elements so far. Answers within 10-5 of the actual answer will be accepted.

// Example 1:
// Input
// ["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
// [[], [1], [2], [], [3], []]
// Output
// [null, null, null, 1.5, null, 2.0]

// Explanation
// MedianFinder medianFinder = new MedianFinder();
// medianFinder.addNum(1);    // arr = [1]
// medianFinder.addNum(2);    // arr = [1, 2]
// medianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)
// medianFinder.addNum(3);    // arr[1, 2, 3]
// medianFinder.findMedian(); // return 2.0

// https://leetcode.com/problems/find-median-from-data-stream/solutions/2806972/javascript-solution/?envType=study-plan-v2&envId=top-100-liked
class MedianFinder {
  nums: number[];
  constructor() {
    this.nums = [];
  }

  addNum(num: number): void {
    const len = this.nums.length;
    if (len === 0 || this.nums[len - 1] <= num) {
      this.nums.push(num);
    } else {
      const i = this.nums.findIndex((n) => n > num);
      this.nums.splice(i, 0, num);
    }
  }

  findMedian(): number {
    const len = this.nums.length;
    const mid = Math.floor(len / 2);
    if (len % 2) {
      return this.nums[mid];
    } else {
      return (this.nums[mid - 1] + this.nums[mid]) / 2;
    }
  }
}

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */

// https://leetcode.com/problems/find-median-from-data-stream/solutions/3858096/simple-two-priority-queues-typescript-solution-beats-100/?envType=study-plan-v2&envId=top-100-liked
// Divide values into two queues: max priority queue for small values and min priority queue for large values. Keep queues balanced.
// For example, for values added in any order 1,2,3,4: maxQ([1, 2]) and minQ([3, 4]) - O(1) access to 2 and 3, O(1) to calculate median
import { PriorityQueue } from '@datastructures-js/priority-queue';

class MedianFinder2 {
  minQ: PriorityQueue<number>;
  maxQ: PriorityQueue<number>;
  constructor() {
    this.minQ = new PriorityQueue((a, b) => a - b);
    this.maxQ = new PriorityQueue((a, b) => b - a);
  }

  addNum(num: number): void {
    if (this.maxQ.size() === 0 || num < this.maxQ.front()) {
      this.maxQ.enqueue(num);
    } else {
      this.minQ.enqueue(num);
    }

    if (this.maxQ.size() - this.minQ.size() === 2) {
      this.minQ.enqueue(this.maxQ.dequeue());
    } else if (this.minQ.size() > this.maxQ.size()) {
      this.maxQ.enqueue(this.minQ.dequeue());
    }
  }

  findMedian(): number {
    if (this.minQ.size() === this.maxQ.size()) {
      return (this.minQ.front() + this.maxQ.front()) / 2;
    }

    return this.maxQ.front();
  }
}
