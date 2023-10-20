// https://leetcode.com/problems/flatten-nested-list-iterator/
//  Each element is either an integer or a list whose elements may also be integers or other lists. Implement an iterator to flatten it.
// Your code will be tested with the following pseudocode:

// initialize iterator with nestedList
// res = []
// while iterator.hasNext()
//     append iterator.next() to the end of res
// return res
// If res matches the expected flattened list, then your code will be judged as correct.

/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * class NestedInteger {
 *     If value is provided, then it holds a single integer
 *     Otherwise it holds an empty nested list
 *     constructor(value?: number) {
 *         ...
 *     };
 *
 *     Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     isInteger(): boolean {
 *         ...
 *     };
 *
 *     Return the single integer that this NestedInteger holds, if it holds a single integer
 *     Return null if this NestedInteger holds a nested list
 *     getInteger(): number | null {
 *         ...
 *     };
 *
 *     Set this NestedInteger to hold a single integer equal to value.
 *     setInteger(value: number) {
 *         ...
 *     };
 *
 *     Set this NestedInteger to hold a nested list and adds a nested integer elem to it.
 *     add(elem: NestedInteger) {
 *         ...
 *     };
 *
 *     Return the nested list that this NestedInteger holds,
 *     or an empty list if this NestedInteger holds a single integer
 *     getList(): NestedInteger[] {
 *         ...
 *     };
 * };
 */

class NestedIterator {
  stack: number[] = [];
  constructor(nestedList: NestedInteger[]) {
    this.flatten(nestedList);
  }

  flatten(nestedList: NestedInteger[]) {
    let n: NestedInteger;
    while ((n = nestedList.pop())) {
      if (n.isInteger()) {
        this.stack.push(n.getInteger());
      } else {
        this.flatten(n.getList());
      }
    }
  }

  // Returns true if there are still some integers in the nested list and false otherwise.
  hasNext(): boolean {
    return !!this.stack.length;
  }

  // Returns the next integer in the nested list.
  next(): number {
    return this.stack.pop();
  }
}

/**
 * Your ParkingSystem object will be instantiated and called as such:
 * var obj = new NestedIterator(nestedList)
 * var a: number[] = []
 * while (obj.hasNext()) a.push(obj.next());
 */
