// https://leetcode.com/problems/first-unique-number/
// You have a queue of integers, you need to retrieve the first unique integer in the queue.
// Implement the `FirstUnique` class:
// FirstUnique(int[] nums) Initializes the object with the numbers in the queue.
// int showFirstUnique() returns the value of the first unique integer of the queue, and returns -1 if there is no such integer.
// void add(int value) insert value to the queue.

// Example 1:
// Input:
// ["FirstUnique","showFirstUnique","add","showFirstUnique","add","showFirstUnique","add","showFirstUnique"]
// [[[2,3,5]],[],[5],[],[2],[],[3],[]]
// Output:
// [null,2,null,2,null,3,null,-1]
// Explanation:
// FirstUnique firstUnique = new FirstUnique([2,3,5]);
// firstUnique.showFirstUnique(); // return 2
// firstUnique.add(5);            // the queue is now [2,3,5,5]
// firstUnique.showFirstUnique(); // return 2
// firstUnique.add(2);            // the queue is now [2,3,5,5,2]
// firstUnique.showFirstUnique(); // return 3
// firstUnique.add(3);            // the queue is now [2,3,5,5,2,3]
// firstUnique.showFirstUnique(); // return -1

class FirstUnique {
  uniques: Set<number>;
  duplicates: Set<number>;
  constructor(nums: number[]) {
    this.uniques = new Set();
    this.duplicates = new Set();

    for (const num of nums) {
      this.add(num);
    }
  }

  showFirstUnique(): number {
    const first = this.uniques.keys().next().value;
    return first || -1;
  }

  add(value: number): void {
    if (!this.uniques.has(value) && !this.duplicates.has(value)) {
      this.uniques.add(value);
    } else {
      this.duplicates.add(value);
      this.uniques.delete(value);
    }
  }
}

/**
 * Your FirstUnique object will be instantiated and called as such:
 * var obj = new FirstUnique(nums)
 * var param_1 = obj.showFirstUnique()
 * obj.add(value)
 */
