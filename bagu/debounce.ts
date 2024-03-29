// 防抖：n 秒内函数只会执行一次，若在 n 秒内被重复触发，则重新计时

/**
 * @param {(...args: any[]) => any} func
 * @param {number} wait
 * @returns {(...args: any[]) => any}
 */
function debounce(
  func: (...arg0: any[]) => void,
  wait: number,
): (...args: any[]) => any {
  let timer: NodeJS.Timeout;
  return (args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/**
 * with option: {leading: boolean, trailing: boolean}
 */
function debounce_option(
  func: { apply: (...args: any[]) => void },
  wait: number,
  option = { leading: false, trailing: true },
) {
  // in basic debounce, we kept only timerId
  // here, we will keep lastArgs too as we trailing function call with last arguments
  let timer: NodeJS.Timeout | null;
  let lastArgs: any[] | null = null;

  // if both leading and trailing are false then do nothing.
  if (!option.leading && !option.trailing) return () => null;

  return function (...args: any[]) {
    // if timer is over and leading is true
    // then immediately call supplied function
    // else capture arguments in lastArgs
    if (!timer && option.leading) {
      func.apply(this, args);
      // func(...args);
    } else {
      lastArgs = args;
    }

    // clear timer so that next call is exactly after `wait` time
    clearTimeout(timer as NodeJS.Timeout);

    timer = setTimeout(() => {
      // invoke only if lastArgs is present and trailing is true
      if (option.trailing && lastArgs) {
        func.apply(this, lastArgs);
        // func(...lastArgs);
      }

      // reset variables as they need to restart new life after calling this function
      lastArgs = null;
      timer = null;
    }, wait);
  };
}
