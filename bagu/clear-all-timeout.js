/**
 * cancel all timer from window.setTimeout
 */
const _setTimeout = window.setTimeout;
const _clearTimeout = window.clearTimeout;
const timers = new Set();

window.setTimeout = function (fn, delay, ...args) {
  let timerId;
  const callback = () => {
    fn.apply(args);
    timers.delete(timerId);
  };
  timerId = _setTimeout(callback, delay);
  timers.add(timerId);
  return timerId;
};

window.clearTimeout = function (timerId) {
  timers.delete(timerId);
  _clearTimeout(timerId);
};

function clearAllTimeout() {
  for (const timerId of timers) {
    clearTimeout(timerId);
  }
}
