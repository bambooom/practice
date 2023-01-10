// https://leetcode.com/problems/lfu-cache/
// Least Frequently Used (LFU) cache.
// To determine the least frequently used key, a use counter is maintained for each key in the cache. The key with the smallest use counter is the least frequently used key.
// When a key is first inserted into the cache, its use counter is set to 1 (due to the put operation). The use counter for a key in the cache is incremented either a get or put operation is called on it.
// The functions get and put must each run in O(1) average time complexity.

class LFUCache {
  size: number;
  values: Map<number, number> = new Map();
  times: Map<number, number> = new Map();
  useMap: Map<number, Set<number>> = new Map();
  min: number;

  constructor(capacity: number) {
    // 缓存空间大小
    this.size = capacity;
    // 缓存存储
    this.values = new Map(); // key:value
    this.times = new Map(); // key：次数
    // 找到当前次数最小的key
    // useMap更新的逻辑，其实vue的响应式依赖管理很像
    this.useMap = new Map(); // 次数：key，set(key)
    this.min = 0; // 最小次数是多少
  }

  get(key: number): number {
    if (this.values.has(key)) {
      // 更新计数
      this.updateCount(key);
      return this.values.get(key) as number;
    }
    return -1;
  }

  put(key: number, value: number): void {
    // 缓存空间为 0，不操作
    if (this.size === 0) return;
    if (this.values.has(key)) {
      // key值存在，不需要淘汰
      this.values.set(key, value);
      this.updateCount(key);
    } else {
      // key值不存在，判断是否超过缓存 size
      if (this.size === this.values.size) {
        // 满了需要淘汰掉 次数最少的、最长时间未访问的
        const minSet = this.useMap.get(this.min) as Set<number>;
        const minKey = minSet.keys().next().value;
        minSet.delete(minKey);
        this.values.delete(minKey);
        this.times.delete(minKey);
      }
      // 加入缓存
      this.values.set(key, value);
      // 这个数据出现了 1 次
      const useSet = this.useMap.get(1) || (new Set() as Set<number>);
      useSet.add(key);
      this.useMap.set(1, useSet);
      this.times.set(key, 1);
      this.min = 1;
    }
  }

  updateCount(key: number): void {
    let time = this.times.get(key) as number;
    let useSet = this.useMap.get(time) as Set<number>;
    if (this.min === time && useSet.size === 1) {
      //当前次数是最小值 并且 这个次数set集合只有一个 key
      this.min += 1;
    }
    time += 1;
    useSet.delete(key);
    useSet = this.useMap.get(time) || new Set();
    useSet.add(key);
    this.useMap.set(time, useSet);
    this.times.set(key, time);
  }
}

// Input
// ["LFUCache", "put", "put", "get", "put", "get", "get", "put", "get", "get", "get"]
// [[2], [1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]]
// Output
// [null, null, null, 1, null, -1, 3, null, -1, 3, 4]

// Explanation
// cnt(x) = the use counter for key x
// cache=[] will show the last used order for tiebreakers (leftmost element is  most recent)
const lfu = new LFUCache(2);
lfu.put(1, 1); // cache=[1,_], cnt(1)=1
lfu.put(2, 2); // cache=[2,1], cnt(2)=1, cnt(1)=1
lfu.get(1); // return 1
// cache=[1,2], cnt(2)=1, cnt(1)=2
lfu.put(3, 3); // 2 is the LFU key because cnt(2)=1 is the smallest, invalidate 2.
// cache=[3,1], cnt(3)=1, cnt(1)=2
lfu.get(2); // return -1 (not found)
lfu.get(3); // return 3
// cache=[3,1], cnt(3)=2, cnt(1)=2
lfu.put(4, 4); // Both 1 and 3 have the same cnt, but 1 is LRU, invalidate 1.
// cache=[4,3], cnt(4)=1, cnt(3)=2
lfu.get(1); // return -1 (not found)
lfu.get(3); // return 3
// cache=[3,4], cnt(4)=1, cnt(3)=3
lfu.get(4); // return 4
// cache=[4,3], cnt(4)=2, cnt(3)=3

// ---------------------------------------------------------- solution using DLL

// Node in Double Linked List
class Node {
  key: number;
  value: number;
  previous: Node | null;
  next: Node | null;
  count: number;

  constructor(key: number, value: number) {
    this.key = key;
    this.value = value;
    this.previous = null;
    this.next = null;
    this.count = 1;
  }
}

// Double Linked List
class DoubleLinkedList {
  head: Node; // Dummy head
  tail: Node; // Dummy tail
  size: number; // Nb of elements in list

  constructor() {
    this.size = 0;
    this.head = new Node(-1, -1);
    this.tail = new Node(-1, -1);
    this.head.next = this.tail;
    this.tail.previous = this.head;
  }

  addNode(node: Node) {
    this.head.next.previous = node;
    node.previous = this.head;
    node.next = this.head.next;
    this.head.next = node;
    this.size++;
  }

  removeNode(node: Node) {
    node.previous.next = node.next;
    node.next.previous = node.previous;
    node.next = null;
    node.previous = null;
    this.size--;
  }

  popLast(): Node | null {
    // Edge case if list is empty
    // (shouldn't be the case with the LFU as it deletes empty list)
    if (this.tail.previous === this.head) {
      return null;
    }

    const last = this.tail.previous;
    this.removeNode(last);
    return last;
  }
}

// Actual LFU
class LFUCache2 {
  capacity: number; // Capacity provided in constructor
  size: number; // Actual nb of elements in the LFU
  mapOfLists: Record<number, DoubleLinkedList>; // Map of frequencies -> DoubleLinkedLists
  mapOfNodes: Record<number, Node>; // Map of keys -> Nodes

  constructor(capacity: number) {
    this.capacity = capacity;
    this.size = 0;
    this.mapOfLists = {};
    this.mapOfNodes = {};
  }

  get(key: number): number {
    const node = this.mapOfNodes[key];

    // If not found in
    if (!node) {
      return -1;
    }

    // Remove node from its current list
    const list = this.mapOfLists[node.count];
    list.removeNode(node);

    // Delete list if empty
    if (list.size === 0) {
      delete this.mapOfLists[node.count];
    }

    // Increase count
    node.count++;

    // Create new list for this frequency if not present
    if (!this.mapOfLists[node.count]) {
      this.mapOfLists[node.count] = new DoubleLinkedList();
    }

    // Add in new list
    this.mapOfLists[node.count].addNode(node);

    return node.value;
  }

  put(key: number, value: number): void {
    // Edge case if no capacity provided
    // Useless cache
    if (this.capacity === 0) {
      return;
    }

    let node: Node | null = null;

    // If key (and thus node) is not yet known
    if (this.mapOfNodes[key] === undefined) {
      // If already full, delete the LRU
      if (this.capacity === this.size) {
        // Search for lowest frequency
        let smallest = -1;
        for (const key of Object.keys(this.mapOfLists)) {
          // Key becomes a string in an object {}
          const parsedKey = parseInt(key, 10);
          if (smallest === -1 || smallest > parsedKey) {
            smallest = parsedKey;
          }
        }
        const list = this.mapOfLists[smallest];
        // Evict node
        const nodeToEvict = list.popLast();
        delete this.mapOfNodes[nodeToEvict.key];

        // Delete list if it's now empty
        if (list.size === 0) {
          delete this.mapOfLists[nodeToEvict.count];
        }
      } else {
        // Else if it's not full, just increase the size
        this.size++;
      }

      // Create new node
      node = new Node(key, value);
      this.mapOfNodes[key] = node;
    } else {
      // If already exists, reset its "state"

      node = this.mapOfNodes[key];

      // Remove node from its current list
      const list = this.mapOfLists[node.count];
      list.removeNode(node);

      // Delete list if empty
      if (list.size === 0) {
        delete this.mapOfLists[node.count];
      }

      // Update value & count
      node.value = value;
      node.count++;
    }

    // Create list if not present
    if (!this.mapOfLists[node.count]) {
      this.mapOfLists[node.count] = new DoubleLinkedList();
    }

    // Add node
    this.mapOfLists[node.count].addNode(node);
  }
}
