// https://leetcode.com/problems/taking-maximum-energy-from-the-mystic-dungeon
// In a mystic dungeon, n magicians are standing in a line. Each magician has an attribute that gives you energy. Some magicians can give you negative energy, which means taking energy from you.
// You have been cursed in such a way that after absorbing energy from magician i, you will be instantly transported to magician (i + k). This process will be repeated until you reach the magician where (i + k) does not exist.
// In other words, you will choose a starting point and then teleport with k jumps until you reach the end of the magicians' sequence, absorbing all the energy during the journey.
// You are given an array energy and an integer k. Return the maximum possible energy you can gain.
// Note that when you are reach a magician, you must take energy from them, whether it is negative or positive energy.

// Example 1:
// Input: energy = [5,2,-10,-5,1], k = 3
// Output: 3
// Explanation: We can gain a total energy of 3 by starting from magician 1 absorbing 2 + 1 = 3.

// Example 2:
// Input: energy = [-2,-3,-1], k = 2
// Output: -1
// Explanation: We can gain a total energy of -1 by starting from magician 2.

// Constraints:
// 1 <= energy.length <= 10^5
// -1000 <= energy[i] <= 1000
// 1 <= k <= energy.length - 1

function maximumEnergy(energy: number[], k: number): number {
  const n = energy.length;
  // Initialize a dp array of length n, filled with zeros
  const dp: number[] = new Array(n).fill(0);
  let result = -Infinity;

  for (let i = n - 1; i >= 0; i--) {
    // Calculate the maximum energy that can be gained by starting at index i and teleporting k steps
    // If i + k is out of bounds, default to zero
    dp[i] = energy[i] + (i + k < n ? dp[i + k] : 0);
    // Update result to be the maximum of the current result and the energy at index i
    result = Math.max(result, dp[i]);
  }

  return result;
}
