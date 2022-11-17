/*
type Callback = (error: Error, data: any) => void

type AsyncFunc = (
  callback: Callback,
  data: any
) => void

*/

/**
 * @param {AsyncFunc[]} funcs
 * @return {(callback: Callback) => void}
 */
function race(funcs) {
  return function (cb) {
    let finished = false;
    funcs.forEach((func) => {
      func((e, v) => {
        if (finished) return;
        cb(e, v);
        finished = true;
      });
    });
  };
}
