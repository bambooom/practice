// https://leetcode.com/problems/design-a-number-container-system

import { MinPriorityQueue } from '@datastructures-js/priority-queue';

// Design a number container system that can do the following:

// Insert or Replace a number at the given index in the system.
// Return the smallest index for the given number in the system.
// Implement the NumberContainers class:

// NumberContainers() Initializes the number container system.
// void change(int index, int number) Fills the container at index with the number. If there is already a number at that index, replace it.
// int find(int number) Returns the smallest index for the given number, or -1 if there is no index that is filled by number in the system.

class NumberContainers {
  objWithIndexes: Record<number, number>;
  objValuesHeap: Record<number, MinPriorityQueue<number>>;
  constructor() {
    this.objWithIndexes = {};
    this.objValuesHeap = {};
  }

  change(index: number, number: number): void {
    this.objWithIndexes[index] = number;
    if (!this.objValuesHeap[number]) {
      this.objValuesHeap[number] = new MinPriorityQueue();
    }
    this.objValuesHeap[number]!.enqueue(index);
  }

  find(number: number): number {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const index = this.objValuesHeap[number]!.front();
      if (index === undefined) {
        return -1;
      }
      if (this.objWithIndexes[index] !== number) {
        this.objValuesHeap[number].dequeue();
        continue;
      }
      return index;
    }
  }
}

/**
 * Your NumberContainers object will be instantiated and called as such:
 * var obj = new NumberContainers()
 * obj.change(index,number)
 * var param_2 = obj.find(number)
 */
