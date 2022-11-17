/**
 * Approach 1: Channing callback using idx as closure
 */
function sequence(funcs) {
  return function (finalCB, data) {
    // we can use queue also here check BFE solution
    let nextFuncIndex = 0; // closure

    const callNextFunc = (data) => {
      // when no more function is to be called
      if (nextFuncIndex === funcs.length) {
        finalCB(undefined, data);
        return;
      }
      // if error , callback right way
      // if not error, recursively callNextFunc
      const nextFunc = funcs[nextFuncIndex];
      nextFuncIndex += 1;

      // every func is of the form of (callback, data) and callback is of the form (error, data)
      // callback gets called after a settimeout once the func is done, we then call the next func if no error
      let cb = (error, newData) => {
        error ? finalCB(error, undefined) : callNextFunc(newData);
      };
      nextFunc(cb, data);
    };
    callNextFunc(data);
  };
}

/**
 * Approach 1b
 * Same as first just using queue/array to pop func
 */
function parallel(funcs) {
  return function (finalCB, data) {
    const nextFuncCall = (data) => {
      if (!funcs.length) {
        finalCB(undefined, data);
        return;
      }
      const nextFunc = funcs.shift();
      const cb = (error, newdata) => {
        !error ? nextFuncCall(newdata) : finalCB(error);
      };
      nextFunc(cb, data);
    };
    nextFuncCall(data);
  };
}

/**
 * Approach 1c
 * Same as first just using queue/array to pop func
 */
function sequence_withoutPromise(funcs) {
  const next = (callback, data) => {
    // if there're no more functions to call, call the final function in the queue.
    if (!funcs.length) return callback(undefined, data);

    // take out (dequeue) the function entered in the functions queue
    // call it with data and a callback for result
    funcs.shift()((err, newData) => {
      // If undefined/Error, we don't need to recurse anymore and immediately call the callback
      // Recursively call the the next
      err ? callback(error, undefined) : next(callback, newData);
    }, data);
  };
  return next;
}
/**
 * Appraoch 2: Using Async and Await
 * @param {AsyncFunc[]} funcs
 * @return {(callback: Callback) => void}
 */
// input data from prev call
function promisify(func, inputData) {
  return new Promise((resolve, reject) => {
    // respData after processing the callback when time out is done
    func((err, respData) => {
      !err ? resolve(respData) : reject(err);
    }, inputData);
  });
}

function sequence_withAsyncAwait(funcs) {
  return async function (callback, initData) {
    let ret = initData;
    try {
      for (let func of funcs) {
        ret = await promisify(func, ret);
      }
    } catch (ex) {
      callback(ex, ret);
    }
    callback(undefined, ret);
  };
}

/**
* Using promise
* Step 1: we create a starter promise with initial data in its resolver, accumlatorPromise points to this when we start
* Step 2: loop over the funcs array and create promise for each func(using promisify)
* Step 3: once promisify is resolved it will return a resolve promise with the new data from the func call
  and this new resolve promise will be the accumlatorPromise which will call promisify again on the next func in the array
*/
function sequence(funcs) {
  return function (finalCallback, initialData) {
    const starterPromise = Promise.resolve(initialData);

    const finalPromise = funcs.reduce((accumlatorPromise, currentFn) => {
      return accumlatorPromise
        .then((data) => {
          return promisify(currentFn, data); // this will create a new promise and run the executor which will resolve/reject
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }, starterPromise);

    // last resolve/reject promise in the accumulator
    finalPromise
      .then((data) => {
        finalCallback(undefined, data);
      })
      .catch((err) => {
        finalCallback(err);
      });
  };
}
