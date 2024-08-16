// https://leetcode.com/problems/design-hashmap/
// Design a HashMap without using any built-in hash table libraries.

// Example 1:
// Input
// ["MyHashMap", "put", "put", "get", "get", "put", "get", "remove", "get"]
// [[], [1, 1], [2, 2], [1], [3], [2, 1], [2], [2], [2]]
// Output
// [null, null, null, 1, -1, null, 1, null, -1]

// Explanation
// MyHashMap myHashMap = new MyHashMap();
// myHashMap.put(1, 1); // The map is now [[1,1]]
// myHashMap.put(2, 2); // The map is now [[1,1], [2,2]]
// myHashMap.get(1);    // return 1, The map is now [[1,1], [2,2]]
// myHashMap.get(3);    // return -1 (i.e., not found), The map is now [[1,1], [2,2]]
// myHashMap.put(2, 1); // The map is now [[1,1], [2,1]] (i.e., update the existing value)
// myHashMap.get(2);    // return 1, The map is now [[1,1], [2,1]]
// myHashMap.remove(2); // remove the mapping for 2, The map is now [[1,1]]
// myHashMap.get(2);    // return -1 (i.e., not found), The map is now [[1,1]]

class MyHashMap {
  // use object to act as hash map
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
