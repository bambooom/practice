// https://leetcode.com/problems/add-two-promises/

/**
 * addTwoPromises(Promise.resolve(2), Promise.resolve(2))
 *   .then(console.log); // 4
 */

// Approach 1: using Promise.all, time O(max(promise1,promise2))
async function addTwoPromises1(
  promise1: Promise<number>,
  promise2: Promise<number>,
): Promise<number> {
  const [res1, res2] = await Promise.all([promise1, promise2]);
  return res1 + res2;
}
// Approach 2: usign await only, O(max(promise1,promise2))
async function addTwoPromises2(
  promise1: Promise<number>,
  promise2: Promise<number>,
): Promise<number> {
  return (await promise1) + (await promise2);
}
// Approach 3: Promise.then(), O(max(promise1,promise2))
async function addTwoPromises3(
  promise1: Promise<number>,
  promise2: Promise<number>,
): Promise<number> {
  return promise1.then((val) => promise2.then((val2) => val + val2));
}
// Approach 4: Count promises, O(promise1+promise2)
// we can use a counter to keep track of the number of promises resolved, and once all promises are resolved,
// it resolves the new promise with the accumulated result.
async function addTwoPromises4(
  promise1: Promise<number>,
  promise2: Promise<number>,
): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    let count = 2;
    let res = 0;

    [promise1, promise2].forEach(async (promise) => {
      try {
        const subRes = await promise;
        res += subRes;
        count--;

        if (count === 0) {
          resolve(res);
        }
      } catch (err) {
        reject(err);
      }
    });
  });
}
