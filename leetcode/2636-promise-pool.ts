// https://leetcode.com/problems/promise-pool/

// n parallel promises, return after all are resolved

type F3 = () => Promise<any>;

// Approach 2: Async/Await + Promise.all() + Array.shift()
//  1. Immediately returns if there are no functions to execute (the base case).
//  2. Removes the first function from the list of functions (using Array.shift).
//  3. Executes that same first function and waits for its completion.
//  4. Recursively calls itself and waits for its own completion.
//     That way as soon as any function finishes, the next function in the queue is processed.
// we use await Promise.all to execute n promises in parallel and wait for their completion.
async function promisePool(functions: F3[], n: number): Promise<any> {
  async function evaluate() {
    if (functions.length === 0) {
      return;
    }

    const fn = functions.shift() as F3;
    await fn();
    await evaluate();
  }

  const p = Array(n).fill(0).map(evaluate);
  return await Promise.all(p);
}

/**
 * const sleep = (t) => new Promise(res => setTimeout(res, t));
 * promisePool([() => sleep(500), () => sleep(400)], 1)
 *   .then(console.log) // After 900ms
 */

// Approach 1: Recursive Helper Function
// 1. Every time we execute a new function, we increment functionIndex and we increment inProgressCount.
// 2. Every time a promise resolves, we decrement inProgressCount,
//    and repeat step 1 while inProgressCount < n and there are still functions left to execute
// 3. If at any point, functionIndex == functions.length and inProgressCount == 0,
//    we are done and should resolve the returned promise.
async function promisePool1(functions: F3[], n: number): Promise<any> {
  return new Promise((resolve) => {
    let inProgressCount = 0;
    let functionIndex = 0;
    function helper() {
      if (functionIndex >= functions.length) {
        if (inProgressCount === 0) resolve(0);
        return;
      }

      while (inProgressCount < n && functionIndex < functions.length) {
        inProgressCount++;
        const promise = functions[functionIndex]();
        functionIndex++;
        promise.then(() => {
          inProgressCount--;
          helper();
        });
      }
    }
    helper();
  });
}

// Approach 3: 2-Liner
//  - Instead of removing the first element of the array via Array.shift, we can instead use the variable n as the current index.
//  - Instead of checking if there are functions left to execute with an if statement, we can use optional chaining on the function call (functions[n++]?.()). This syntax immediately returns undefined if functions[n++] is null or undefined. Without this syntax, an error would be thrown.
//  - Instead of using await on a different line, we can use promise chaining (.then(evaluateNext)).
//  - When initially executing the first n promises in parallel, we need to write functions.slice(0, n).map(f => f().then(evaluateNext)) instead of simply functions.slice(0, n).map(evaluateNext). That way the first n promises are executed immediately outside of the helper function so we can correctly use n as the index variable.
async function promisePool3(functions: F3[], n: number): Promise<any> {
  const evaluateNext = () => functions[n++]?.().then(evaluateNext);
  return Promise.all(functions.slice(0, n).map((f) => f().then(evaluateNext)));
}
