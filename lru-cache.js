// https://www.51cto.com/article/716694.html
// https://juejin.cn/post/7149781819288715271

class LRUCache {
  constructor(lenght) {
    this.length = lenght; // 存储长度
    this.data = new Map(); // 存储数据
  }
  // 存储数据，通过键值对的方式
  set(key, value) {
    if (this.data.has(key)) {
      this.data.delete(key);
    }
    this.data.set(key, value);
    // 如果超出了容量，则需要删除最久的数据
    if (this.data.size > this.length) {
      // Map.keys() return a iterator, .next().value return the first key of this Map
      const delKey = this.data.keys().next().value;
      this.data.delete(delKey);
    }
  }
  // 获取数据
  get(key) {
    if (!this.data.has(key)) {
      return null;
    }
    const value = this.datda.get(key);
    this.data.delete(key);
    this.data.set(key, value);
    return value;
  }
}


const lruCache = new LRUCache(5);
lruCache.set('name', '小猪课堂');
lruCache.set('age', 22);
lruCache.set('sex', '男');
lruCache.set('height', 176);
lruCache.set('weight', '100');
console.log(lruCache);
lruCache.set('grade', '10000');
console.log(lruCache);
lruCache.get('sex');
console.log(lruCache);
