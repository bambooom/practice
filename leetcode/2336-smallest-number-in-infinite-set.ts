// https://leetcode.com/problems/smallest-number-in-infinite-set/

// You have a set which contains all positive integers [1, 2, 3, 4, 5, ...].
// Implement the SmallestInfiniteSet class:

// limit: 1 <= num <= 1000

class SmallestInfiniteSet {
  currentSmall: number;
  addedList: number[];
  // Initializes the SmallestInfiniteSet object to contain all positive integers.
  constructor() {
    this.currentSmall = 1;
    this.addedList = [];
  }

  // Removes and returns the smallest integer contained in the infinite set.
  popSmallest(): number {
    if (this.addedList.length) {
      return this.addedList.shift()!;
    } else {
      this.currentSmall += 1;
      return this.currentSmall - 1;
    }
  }

  // Adds a positive integer num back into the infinite set, if it is not already in the infinite set.
  addBack(num: number): void {
    if (num < this.currentSmall) {
      if (!this.addedList.includes(num)) {
        this.addedList.push(num);
        this.addedList = this.addedList.sort((a, b) => a - b);
      }
    }
  }
}

/**
 * Your SmallestInfiniteSet object will be instantiated and called as such:
 * var obj = new SmallestInfiniteSet()
 * var param_1 = obj.popSmallest()
 * obj.addBack(num)
 */

class SmallestInfiniteSet2 {
  arr: boolean[];
  constructor() {
    this.arr = new Array(1001).fill(true);
  }
  popSmallest(): number {
    for (let i = 1; i < this.arr.length; i++) {
      if (this.arr[i]) {
        this.arr[i] = false;
        return i;
      }
    }
    return -1;
  }
  addBack(num: number): void {
    this.arr[num] = true;
  }
}
