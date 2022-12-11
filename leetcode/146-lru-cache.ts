// https://leetcode.com/problems/lru-cache/

class LRUCache {
  private capacity: number;
  private data: Map<number, number>;
  constructor(capacity: number) {
    this.capacity = capacity;
    this.data = new Map();
  }

  get(key: number): number {
    if (!this.data.has(key)) {
      return -1;
    }
    const value = this.data.get(key) as number;
    this.data.delete(key);
    this.data.set(key, value);
    return value;
  }

  put(key: number, value: number): void {
    if (this.data.has(key)) {
      this.data.delete(key);
    }
    this.data.set(key, value);
    if (this.data.size > this.capacity) {
      const delKey = this.data.keys().next().value;
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
