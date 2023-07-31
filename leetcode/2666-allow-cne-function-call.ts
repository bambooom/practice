// https://leetcode.com/problems/allow-one-function-call/description/

// function can only called once

type Fn1 = (...args: any[]) => any;

function once(fn: Fn1): Fn1 {
  let call = false;
  return function (...args) {
    if (!call) {
      call = true;
      return fn(...args);
    }
    return undefined;
  };
}

/**
 * let fn = (a,b,c) => (a + b + c)
 * let onceFn = once(fn)
 *
 * onceFn(1,2,3); // 6
 * onceFn(2,3,6); // returns undefined without calling fn
 */
