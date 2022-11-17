/**
 * @param {Function} func
 * @param {(args:[]) => string }  [resolver] - cache key generator
 */
function memo(func, resolver) {
  const cache = {};
  return function (...args) {
    const key = resolver
      ? resolver(...args)
      : args.slice(0, func.length).join('_');
    if (!cache[key]) {
      cache[key] = func.apply(this, args);
    }
    return cache[key];
  };
}

const func = (arg1, arg2) => {
  return arg1 + arg2;
};
const memoed = memo(func, () => 'samekey');

console.log(memoed(1, 2));
// 3, func is called, 3 is cached with key 'samekey'

console.log(memoed(1, 2));
// 3, since key is the same, 3 is returned without calling func

console.log(memoed(1, 3));
// 3, since key is the same, 3 is returned without calling func

// ----------------------

/**
 * @param {Function} func
 * @param {(args:[]) => string }  [resolver] - cache key generator
 */

// With this context in mind, check test cases below.
function memo_map(func, resolver = (...args) => args.join('_')) {
  const cache = new Map();

  return function (...args) {
    const cacheKey = resolver(...args);
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }
    const value = func.apply(this, args);
    cache.set(cacheKey, value);
    return value;
  };
}

function testThis(a) {
  return `${this.val}_${a}`;
}

const memoFunc = memo_map(testThis);

const testSubject = {
  val: 1,
  memo: memoFunc,
};

const testSubject2 = {
  val: 2,
  memo: memoFunc,
};

// 1_1
console.log(testSubject.memo(1));
// Expected no caching and output is 2_1
console.log(testSubject2.memo(1));
// Expected to cache
console.log(testSubject2.memo(1));
