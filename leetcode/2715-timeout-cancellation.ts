// https://leetcode.com/problems/timeout-cancellation/editorial/
// After a delay of t, fn should be called with args passed as parameters
// unless cancelFn was invoked before the delay of t milliseconds elapses,
// specifically at cancelT ms.In that case, fn should never be called.

// eslint-disable-next-line @typescript-eslint/ban-types
function cancellable(fn: Function, args: any[], t: number): Function {
  const timer = setTimeout(() => fn(...args), t);

  return () => {
    clearTimeout(timer);
  };
}

/**
 *  const result = []
 *
 *  const fn = (x) => x * 5
 *  const args = [2], t = 20, cancelT = 50
 *
 *  const start = performance.now()
 *
 *  const log = (...argsArr) => {
 *      const diff = Math.floor(performance.now() - start);
 *      result.push({"time": diff, "returned": fn(...argsArr))
 *  }
 *
 *  const cancel = cancellable(log, args, t);
 *
 *  const maxT = Math.max(t, cancelT)
 *
 *  setTimeout(() => {
 *     cancel()
 *  }, cancelT)
 *
 *  setTimeout(() => {
 *     console.log(result) // [{"time":20,"returned":10}]
 *  }, maxT + 15)
 */
