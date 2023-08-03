// https://leetcode.com/problems/sleep/editorial/

async function sleep(millis: number): Promise<void> {
  return new Promise((res) => setTimeout(res, millis));
}

async function sleep2(milliseconds: number): Promise<void> {
  await new Promise<void>((resolve) => setTimeout(resolve, milliseconds));
}

/**
 * let t = Date.now()
 * sleep(100).then(() => console.log(Date.now() - t)) // 100
 */

// A promise in JavaScript is an object representing the eventual completion or failure of an asynchronous operation.
// Essentially, it's a returned object to which you attach callbacks, as opposed to passing callbacks into a function.
const promise = new Promise((resolve, reject) => {
  const condition = true; // This could be the result of some operation

  // After 1 second, check the condition and resolve or reject the promise
  setTimeout(() => {
    if (condition) {
      resolve('Promise fulfilled!');
    } else {
      reject('Promise rejected!');
    }
  }, 1000);
});

// Attach then() and catch() handlers to the Promise
promise
  .then((value) => {
    // This will be executed if the promise is resolved
    console.log(value); // Output: Promise fulfilled!
  })
  .catch((error) => {
    // This will be executed if the promise is rejected
    console.log(error);
  });

//=============================================================
console.log('Starting the timer...');

setTimeout(() => {
  console.log('Timeout completed!');
}, 2000);

// The actual delay until the callback function is invoked may be slightly longer than the specified delay (here is 2s, longer than 2s).
// This is due to the nature of the event - driven JavaScript runtime and the single - threaded event loop.
// even if the timer has completed in the background, the callback function would still have to wait for the completion of the blocking task.
// This is because the event loop can only handle one task at a time, and it processes tasks in the order they are queued.
// the '2 seconds' specified in setTimeout should be understood as the 'minimum delay' before the callback function is invoked, rather than a 'guaranteed delay'.
