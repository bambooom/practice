/**
 * In case you forgot, throttle(func, delay) will return a throttled function, which will invoke the func at a max frequency no matter how throttled one is called.

Here is an example.

Before throttling we have a series of calling like

─A─B─C─ ─D─ ─ ─ ─ ─ ─ E─ ─F─G

After throttling at wait time of 3 dashes

─A─ ─ ─C─ ─ ─D ─ ─ ─ ─ E─ ─ ─G

Be aware that

call A is triggered right way because not in waiting time
function call B is swallowed because B, C is in the cooling time from A, and C is latter.
 */


/**
 * @param {(...args:any[]) => any} func
 * @param {number} wait
 * @returns {(...args:any[]) => any}
 */
function throttle(func, wait) {
  let waiting = false;
  let lastArgs = null;
  return function(...args) {
    if (!waiting) {
      waiting = true;
      func.apply(this, args);
      let timeout = () => {
        setTimeout(() => {
          waiting = false;
          if (lastArgs) {
            func.apply(this, lastArgs);
            waiting = true;
            lastArgs = null;
            timeout();
          }
        }, wait);
      };
      timeout();
    } else {
      lastArgs = args;
    }
  }
}

// let currentTime = 0;

// const run = (input) => {
//   currentTime = 0;
//   const calls = [];

//   const func = (arg) => {
//     calls.push(`${arg}@${currentTime}`);
//   };

//   const throttled = throttle(func, 3);
//   input.forEach((call) => {
//     const [arg, time] = call.split('@');
//     setTimeout(() => throttled(arg), time);
//   });
//   return calls;
// };

// console.log(run(['A@0', 'B@2', 'C@3']));

/**
 * throttle
 * option: {leading: boolean, trailing: boolean}
leading: whether to invoke right away
trailing: whether to invoke after the delay.
default case with {leading: true, trailing: true}
 */

function throttle_option(func, wait, { leading = true, trailing = true } = {}) {
  let lastArgs = null;
  let timer = null;

  const setTimer = () => {
    if (lastArgs && trailing) {
      func.apply(this, lastArgs);
      lastArgs = null;
      timer = setTimeout(setTimer, wait);
    } else {
      timer = null;
    }
  };

  return function (...args) {
    if (!timer) {
      if (leading) {
        func.apply(this, args);
      }
      timer = setTimeout(setTimer, wait);
    } else {
      lastArgs = args;
    }
  };
}

// another solution, more detailed
function throttle_option2(
  func,
  wait,
  options = { leading: true, trailing: true }
) {
  let timer = null;
  let lastContext = null;
  let lastArgs = null;
  return function (...args) {
    // 1. if called within cool time, then store it for later call
    if (timer !== null) {
      lastContext = this;
      lastArgs = args;
      return;
    }

    // 2. if other than cool time, execute it
    if (options.leading) {
      func.call(this, ...args);
    } else {
      // save for trailing call if needed
      lastContext = this;
      lastArgs = args;
    }

    // 3. set a timeout to clear the cool, time
    // and run the stored context
    const timeup = () => {
      if (options.trailing && lastArgs !== null) {
        func.call(lastContext, ...lastArgs);
        lastContext = null;
        lastArgs = null;
        timer = setTimeout(timeup, wait);
      } else {
        timer = null;
      }
    };

    timer = setTimeout(timeup, wait);
  };
}
