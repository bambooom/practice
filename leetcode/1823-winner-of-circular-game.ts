// https://leetcode.com/problems/find-the-winner-of-the-circular-game/
// #mah recursion, queue #simulation

/**
EXAMPLE: You are given an array [1,2,3,4,5] and you are asked to delete every second element while visualizing these numbers (elements of array) in a circle.

You are probably picturing this:
1-2-3-4-5 ---> 1-3-4-5 ----> 1-3-5 ----> 3-5----> 3 Answer!
Approach 1: Pick (k-1) elements from the front of the array and push/append it to the back of this array while deleting the kth element at every step .

How to implement?
- Use queue data structure
- Iteratively dequeue(remove from front) k-1 elements from it
- Enqueue(push/append) the removed (k-1) elements to the back of the same array.
- Delete the kth element
- Now you have a que of length of (previous-queue-length -1)
- Repeat this until you have only one number left in your queue
- Return the number from your queue!
 */

const findTheWinner = function (n: number, k: number): number {
  // Build queue
  const que = [];
  for (let i = 1; i <= n; i++) {
    que.push(i);
  }

  while (que.length > 1) {
    let deleteCount = k - 1;
    while (deleteCount > 0) {
      que.push(que.shift()); //Rotate Elements
      deleteCount--;
    }
    que.shift(); // Delete kth element
  }
  return que.shift() as number;
};

// https://programming.vip/docs/joseph-problem-of-data-structure-and-algorithms.html
// https://zh.wikipedia.org/wiki/%E7%BA%A6%E7%91%9F%E5%A4%AB%E6%96%AF%E9%97%AE%E9%A2%98
function findTheWinner2(n: number, k: number): number {
  const arr: number[] = [];
  for (let i = 1; i <= n; i++) {
    arr.push(i);
  }

  let toBeRemovedIndex = 0;

  for (let i = 0; i < n - 1; i++) {
    toBeRemovedIndex = (toBeRemovedIndex + k - 1) % (n - i);
    arr.splice(toBeRemovedIndex, 1);
  }

  return arr[0];
}

// ?
// As usual we follow zero-base indexing hence for n=5,k=3
// Friends initially : 0 1 2 3 4

// we keep removing friends a total for n-1 time
// Thus when only one friend (winner) is left we return its position as we know it will obviously be 0th position as it was only one left.
// We keep backtracking, using the previous position value to find the winner position at the currently backtracked cycle. To do this we put to use formula : {(fn(n-1,k)+k)%n}

// finally we add 1 to the answer to get the final answer in 1 based indexing.

const findTheWinner3 = function (n: number, k: number): number {
  // const y = n;
  function ans(n: number, k: number): number {
    if (n == 1) {
      return 0;
    } else {
      return (ans(n - 1, k) + k) % n;
    }
  }

  return ans(n, k) + 1;
};
