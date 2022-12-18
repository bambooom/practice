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

function findTheWinner(n: number, k: number): number {
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
