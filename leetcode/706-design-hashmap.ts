// https://leetcode.com/problems/design-hashmap/

class MyHashMap {
  private _map: { [key: number]: number };
  constructor() {
    this._map = {};
  }

  // inserts a (key, value) pair into the HashMap. If the key already exists in the map, update the corresponding value.
  put(key: number, value: number): void {
    this._map[key] = value;
  }

  // returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key.
  get(key: number): number {
    if (key in this._map) {
      return this._map[key];
    } else {
      return -1;
    }
  }

  // removes the key and its corresponding value if the map contains the mapping for the key.
  remove(key: number): void {
    delete this._map[key];
  }
}

/**
 * Your MyHashMap object will be instantiated and called as such:
 * var obj = new MyHashMap()
 * obj.put(key,value)
 * var param_2 = obj.get(key)
 * obj.remove(key)
 */
