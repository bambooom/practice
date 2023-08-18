// not the classic throttle?

// A throttled function is first called without delay and then, for a time interval of t milliseconds, can't be executed
// but should store the latest function arguments provided to call fn with them after the end of the delay.

type F4 = (...args: any[]) => void;

function throttle(fn: F4, t: number): F4 {
  let pending = false;
  let nextArgs: any[] | undefined;
  const wrapper = (...args: any[]) => {
    nextArgs = args;
    if (!pending) {
      fn(...args);
      pending = true;
      nextArgs = undefined;
      setTimeout(() => {
        pending = false;
        if (nextArgs) wrapper(...nextArgs);
      }, t);
    }
  };
  return wrapper;
}

/**
 * const throttled = throttle(console.log, 100);
 * throttled("log"); // logged immediately.
 * throttled("log"); // logged at t=100ms.
 */
