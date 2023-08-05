// https://leetcode.com/problems/cache-with-time-limit/

type entry = { value: number; timer: NodeJS.Timeout };

class TimeLimitedCache {
  cache = new Map<number, entry>();

  // accepts an integer key, an integer value, and a duration in milliseconds.
  // Once the duration has elapsed, the key should be inaccessible.
  // The method should return true if the same un - expired key already exists and false otherwise.
  // Both the value and duration should be overwritten if the key already exists.
  set(key: number, value: number, duration: number): boolean {
    const v = this.cache.get(key);
    if (v) {
      clearTimeout(v.timer);
    }

    const timer = setTimeout(() => {
      return this.cache.delete(key);
    }, duration);
    this.cache.set(key, { value, timer });

    return Boolean(v);
  }

  // if an un-expired key exists, it should return the associated value. Otherwise it should return -1.
  get(key: number): number {
    return this.cache.has(key) ? this.cache.get(key)!.value : -1;
  }

  // returns the count of un-expired keys.
  count(): number {
    return this.cache.size;
  }
}

/**
 * Your TimeLimitedCache object will be instantiated and called as such:
 * var obj = new TimeLimitedCache()
 * obj.set(1, 42, 1000); // false
 * obj.get(1) // 42
 * obj.count() // 1
 */

// or can using approach with Maintain Expiration Times

/**
 *
type Entry = { value: number, expiration: number };

class TimeLimitedCache {
  cache: Record<string, Entry> = {};

  set(key: number, value: number, duration: number) {
    const hasUnexpiredValue = key in this.cache && Date.now() < this.cache[key].expiration;
    this.cache[key] = { value, expiration: Date.now() + duration };
    return hasUnexpiredValue;
  }

  get(key: number) {
    if (this.cache[key] === undefined) return -1;
    if (Date.now() > this.cache[key].expiration) return -1;
    return this.cache[key].value;
  }

  count() {
    let count = 0;
    for (const entry of Object.values(this.cache)) {
        if (Date.now() < entry.expiration) {
            count += 1;
        }
    }
    return count;
  }
};
 *  */
