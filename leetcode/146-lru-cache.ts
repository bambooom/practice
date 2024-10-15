// https://leetcode.com/problems/lru-cache/
// Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

// Example 1:
// Input
// ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
// [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
// Output
// [null, null, null, 1, null, -1, null, -1, 3, 4]

// Explanation
// LRUCache lRUCache = new LRUCache(2);
// lRUCache.put(1, 1); // cache is {1=1}
// lRUCache.put(2, 2); // cache is {1=1, 2=2}
// lRUCache.get(1);    // return 1
// lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
// lRUCache.get(2);    // returns -1 (not found)
// lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
// lRUCache.get(1);    // return -1 (not found)
// lRUCache.get(3);    // return 3
// lRUCache.get(4);    // return 4

class LRUCache {
  private capacity: number;
  private data: Map<number, number>;

  //Initialize the LRU cache with positive size capacity.
  constructor(capacity: number) {
    this.capacity = capacity;
    this.data = new Map();
  }

  // Return the value of the key if the key exists, otherwise return -1.
  get(key: number): number {
    if (!this.data.has(key)) {
      return -1;
    }
    const value = this.data.get(key) as number;
    this.data.delete(key);
    this.data.set(key, value);
    return value;
  }

  // Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache.
  // If the number of keys exceeds the capacity from this operation, evict the least recently used key.
  put(key: number, value: number): void {
    if (this.data.has(key)) {
      this.data.delete(key);
    }
    this.data.set(key, value);
    if (this.data.size > this.capacity) {
      const delKey = this.data.keys().next().value!;
      this.data.delete(delKey);
    }
  }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
