// https://leetcode.com/problems/execute-asynchronous-functions-in-parallel/

// without using Promise.all

async function promiseAll<T>(functions: (() => Promise<T>)[]): Promise<T[]> {
  return new Promise<T[]>((resolve, reject) => {
    if (functions.length === 0) {
      resolve([]);
      return;
    }

    const res: T[] = new Array(functions.length).fill(null);
    let count = 0;
    functions.forEach(async (f, idx) => {
      try {
        const r = await f();
        res[idx] = r;
        count++;
        if (count === functions.length) {
          resolve(res);
        }
      } catch (error) {
        reject(error);
      }
    });
  });
}

/**
 * const promise = promiseAll([() => new Promise(res => res(42))])
 * promise.then(console.log); // [42]
 */

/**
 *
 * Interview Tips:
 *
 * Q: What does Promise.all() do, and how does it work?
 *
 *    Promise.all() is a utility function in JavaScript that aggregates multiple promises into a single promise that resolves when all of the input promises have resolved, or rejects as soon as any one of the input promises rejects.
 *    It's often used when multiple asynchronous operations need to be performed concurrently, and further computation depends on the completion of all of these operations.
 *
 * Q: What happens if one of the promises passed into Promise.all() rejects?
 *
 *    If any of the promises passed into Promise.all() rejects, the promise returned by Promise.all() immediately rejects with the reason of the first promise that rejected.
 *    This behavior is sometimes called "fail-fast".
 *
 * Q: How can you handle individual promise rejections in Promise.all()?
 *
 *    To handle individual promise rejections in Promise.all(), you could catch errors in individual promises and transform them into a resolution with an error value.
 *    This allows Promise.all() to always resolve, and error handling can then be performed on the resulting array of values.
 *    However, starting with ECMAScript 2020, a better alternative would be to use Promise.allSettled().
 *
 * Q: What is the difference between Promise.all() and Promise.allSettled()?
 *
 *    The Promise.allSettled() method is similar to Promise.all(), but with a key difference.
 *    While Promise.all() rejects as soon as one of the promises rejects,
 *    Promise.allSettled() always resolves after all the promises have settled, i.e., either fulfilled or rejected.
 *    The resolved value of Promise.allSettled() is an array of objects that each describe the outcome of each promise.
 */
