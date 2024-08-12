// https://leetcode.com/problems/kth-largest-element-in-a-stream
// Design a class to find the kth largest element in a stream. Note that it is the kth largest element in the sorted order, not the kth distinct element.
// Implement KthLargest class:
// KthLargest(int k, int[] nums) Initializes the object with the integer k and the stream of integers nums.
// int add(int val) Appends the integer val to the stream and returns the element representing the kth largest element in the stream.

// Example 1:

// Input
// ["KthLargest", "add", "add", "add", "add", "add"]
// [[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
// Output
// [null, 4, 5, 5, 8, 8]

// Explanation
// KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
// kthLargest.add(3);   // return 4
// kthLargest.add(5);   // return 5
// kthLargest.add(10);  // return 5
// kthLargest.add(9);   // return 8
// kthLargest.add(4);   // return 8

// binary search insertion
class KthLargest {
  list: number[];
  k: number;
  constructor(k: number, nums: number[]) {
    this.k = k;
    this.list = nums.sort((a, b) => b - a);
  }

  add(val: number): number {
    let left = 0;
    let right = this.list.length;

    while (left < right) {
      const mid = (left + right) >> 1;
      if (this.list[mid] > val) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    this.list.splice(left, 0, val);
    return this.list[this.k - 1];
  }
}

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */
