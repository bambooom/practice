// https://leetcode.com/problems/interval-cancellation/editorial

// eslint-disable-next-line @typescript-eslint/ban-types
function cancellable2(fn: Function, args: any[], t: number): Function {
  fn(...args);
  const timer = setInterval(() => fn(...args), t);

  return () => {
    clearInterval(timer);
  };
}

/**
 *  const result = []
 *
 *  const fn = (x) => x * 2
 *  const args = [4], t = 20, cancelT = 110
 *
 *  const start = performance.now()
 *
 *  const log = (...argsArr) => {
 *      const diff = Math.floor(performance.now() - start)
 *      result.push({"time": diff, "returned": fn(...argsArr)})
 *  }
 *
 *  const cancel = cancellable(log, args, t);
 *
 *  setTimeout(() => {
 *     cancel()
 *  }, cancelT)
 *
 *  setTimeout(() => {
 *    console.log(result)  // [
 *                         //      {"time":0,"returned":8},
 *                         //      {"time":20,"returned":8},
 *                         //      {"time":40,"returned":8},
 *                         //      {"time":60,"returned":8},
 *                         //      {"time":80,"returned":8},
 *                         //      {"time":100,"returned":8}
 *                         //  ]
 *  }, cancelT + t + 15)
 */

// using recursion
function cancellableR(fn: Function, args: any[], t: number): Function {
  let timerId = null;
  fn(...args);

  const startInterval = (): void => {
    timerId = setTimeout(() => {
      fn(...args);
      startInterval();
    }, t);
  };
  startInterval();

  const cancelInterval: Function = (): void => {
    if (timerId !== null) {
      clearTimeout(timerId);
    }
  };

  return cancelInterval;
}
