// https://leetcode.com/problems/memoize/editorial/

type Fn2 = (...params: any) => any;

function memoize(fn: Fn2): Fn2 {
  const cache: Record<string, any> = {};
  return function (...args) {
    const argsKey = args.join(',');
    if (argsKey in cache) {
      // better use `in` to check key exists
      return cache[argsKey];
    } else {
      const result = fn(...args);
      cache[argsKey] = result;
      return result;
    }
  };
}

/**
 * let callCount = 0;
 * const memoizedFn = memoize(function (a, b) {
 *	 callCount += 1;
 *   return a + b;
 * })
 * memoizedFn(2, 3) // 5
 * memoizedFn(2, 3) // 5
 * console.log(callCount) // 1
 */
