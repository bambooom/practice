// https://leetcode.com/problems/finding-pairs-with-a-certain-sum/
// You are given two integer arrays nums1 and nums2. You are tasked to implement a data structure that supports queries of two types:
// Add a positive integer to an element of a given index in the array nums2.
// Count the number of pairs (i, j) such that nums1[i] + nums2[j] equals a given value (0 <= i < nums1.length and 0 <= j < nums2.length).
// Implement the FindSumPairs class:
// FindSumPairs(int[] nums1, int[] nums2) Initializes the FindSumPairs object with two integer arrays nums1 and nums2.
// void add(int index, int val) Adds val to nums2[index], i.e., apply nums2[index] += val.
// int count(int tot) Returns the number of pairs (i, j) such that nums1[i] + nums2[j] == tot.

// Example 1:
// Input
// ["FindSumPairs", "count", "add", "count", "count", "add", "add", "count"]
// [[[1, 1, 2, 2, 2, 3], [1, 4, 5, 2, 5, 4]], [7], [3, 2], [8], [4], [0, 1], [1, 1], [7]]
// Output
// [null, 8, null, 2, 1, null, null, 11]
// Explanation
// FindSumPairs findSumPairs = new FindSumPairs([1, 1, 2, 2, 2, 3], [1, 4, 5, 2, 5, 4]);
// findSumPairs.count(7);  // return 8; pairs (2,2), (3,2), (4,2), (2,4), (3,4), (4,4) make 2 + 5 and pairs (5,1), (5,5) make 3 + 4
// findSumPairs.add(3, 2); // now nums2 = [1,4,5,4,5,4]
// findSumPairs.count(8);  // return 2; pairs (5,2), (5,4) make 3 + 5
// findSumPairs.count(4);  // return 1; pair (5,0) makes 3 + 1
// findSumPairs.add(0, 1); // now nums2 = [2,4,5,4,5,4]
// findSumPairs.add(1, 1); // now nums2 = [2,5,5,4,5,4]
// findSumPairs.count(7);  // return 11; pairs (2,1), (2,2), (2,4), (3,1), (3,2), (3,4), (4,1), (4,2), (4,4) make 2 + 5 and pairs (5,3), (5,5) make 3 + 4

class FindSumPairs {
  nums1: number[];
  nums2: number[];
  // freq1: Map<number, number>;
  freq2: Map<number, number>;
  constructor(nums1: number[], nums2: number[]) {
    this.nums1 = nums1;
    this.nums2 = nums2;
    // this.freq1 = new Map<number, number>();
    this.freq2 = new Map<number, number>();

    // for (const num of nums1) {
    //   this.freq1.set(num, (this.freq1.get(num) || 0) + 1);
    // }
    for (const num of nums2) {
      this.freq2.set(num, (this.freq2.get(num) || 0) + 1);
    }
  }

  // Adds val to nums2[index], i.e., apply nums2[index] += val.
  add(index: number, val: number): void {
    const orig = this.nums2[index];
    this.freq2.set(orig, this.freq2.get(orig)! - 1);
    this.nums2[index] += val;
    this.freq2.set(
      this.nums2[index],
      (this.freq2.get(this.nums2[index]) || 0) + 1,
    );
  }

  // Returns the number of pairs (i, j) such that nums1[i] + nums2[j] == tot.
  count(tot: number): number {
    let res = 0;
    for (let i = 0; i < this.nums1.length; i++) {
      const num = this.nums1[i];
      if (this.freq2.has(tot - num)) {
        res += this.freq2.get(tot - num)!;
      }
    }
    return res;
  }
}

/**
 * Your FindSumPairs object will be instantiated and called as such:
 * var obj = new FindSumPairs(nums1, nums2)
 * obj.add(index,val)
 * var param_2 = obj.count(tot)
 */
