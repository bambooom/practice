// https://leetcode.com/problems/debounce/

// A debounced function is a function whose execution is delayed by t milliseconds
// and whose execution is cancelled if it is called again within that window of time.
// The debounced function should also receive the passed parameters.

type F2 = (...p: any[]) => any;

function debounce(fn: F2, t: number): F2 {
  let timer: NodeJS.Timeout;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, t);
  };
}

/**
 * const log = debounce(console.log, 100);
 * log('Hello'); // cancelled
 * log('Hello'); // cancelled
 * log('Hello'); // Logged at t=100ms
 */
