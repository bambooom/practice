// https://leetcode.com/problems/promise-time-limit/

/*
Given an asynchronous function fn and a time t in milliseconds,
return a new time limited version of the input function.
fn takes arguments provided to the time limited function.

The time limited function should follow these rules:

- If the fn completes within the time limit of t milliseconds,
  the time limited function should resolve with the result.
- If the exec ution of the fn exceeds the time limit,
  the time limited function should reject with the string "Time Limit Exceeded".
*/

type Fn3 = (...params: any[]) => Promise<any>;

// Approach 2: Handle Clearing Timeout

function timeLimit(fn: Fn3, t: number): Fn3 {
  return async function (...args) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject('Time Limit Exceeded');
      }, t);
      fn(...args)
        .then(resolve)
        .catch(reject)
        .finally(() => clearTimeout(timer));
    });
  };
}

/**
 * const limited = timeLimit((t) => new Promise(res => setTimeout(res, t)), 100);
 * limited(150).catch(console.log) // "Time Limit Exceeded" at t=100ms
 */

/**
 * Long Running Process
 *
  async function repeatProcessIndefinitely() {
    while (true) {
      try {
        await someProcess();
      } catch (e) {
        console.error(e);
      }
    }
  }

 * If someProcess were to ever never fulfill, the loop would get frozen and nothing would happen.
 * Forcing someProcess to throw an error would unfreeze the process.
 *
 * An important consideration is that code in someProcess can still continue executing
 * even if the promise was rejected. So you might have multiple blocks of code executing in parallel.
 * A better solution may be fix the underlying issue which caused the freeze or to implement proper cancellation.
 * Consider solving Design Cancellable Function to implement true cancellation.
 */

// Approach 1: Call Function Inside New Promise
// if the function's promise fulfills before the time limit elapses,
// the reject logic will still be triggered unnecessarily at some point in the future
// However, imagine if the time limit was set for a very long time. These blocks of code
// will have to be stored in memory for a long time until they are eventually executed by the JavaScript event loop.
function timeLimit1(fn: Fn3, t: number): Fn3 {
  return async function (...args) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('Time Limit Exceeded');
      }, t);
      fn(...args)
        .then(resolve)
        .catch(reject);
    });
  };
}

// Approach 3: Promise Race
function timeLimit3(fn: Fn3, t: number): Fn3 {
  return async function (...args) {
    const timeLimitPromise = new Promise((resolve, reject) => {
      setTimeout(() => reject('Time Limit Exceeded'), t);
    });
    const returnedPromise = fn(...args);
    // Promise.race function. It accepts an array of promises and returns a new promise.
    // The returned promise resolves or rejects with the first value one of the promises resolves or rejects with.
    return Promise.race([timeLimitPromise, returnedPromise]);
  };
}

// Approach 4: Async/Await + Clearing Timeout
function timeLimit4(fn: Fn3, t: number): Fn3 {
  return async function (...args) {
    return new Promise(async (resolve, reject) => {
      const timeout = setTimeout(() => {
        reject('Time Limit Exceeded');
      }, t);

      try {
        const result = await fn(...args);
        resolve(result);
      } catch (err) {
        reject(err);
      }
      clearTimeout(timeout);
    });
  };
}
