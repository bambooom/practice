// https://leetcode.com/problems/bulls-and-cows/

// You write down a secret number and ask your friend to guess what the number is. When your friend makes a guess, you provide a hint with the following info:
// The number of "bulls", which are digits in the guess that are in the correct position.
// The number of "cows", which are digits in the guess that are in your secret number but are located in the wrong position. Specifically, the non-bull digits in the guess that could be rearranged such that they become bulls.
// Given the secret number secret and your friend's guess guess, return the hint for your friend's guess.

// Input: secret = "1807", guess = "7810"
// Output: "1A3B"

function getHint(secret: string, guess: string): string {
  const n = secret.length;
  let a = 0; // correnct position
  let b = 0; // wrong position
  const map: { [key: string]: number } = {};

  for (let i = 0; i < n; i++) {
    const s = secret[i];
    const g = guess[i];
    if (s === g) {
      a++;
    } else {
      if (map[s] < 0) b++;
      if (map[g] > 0) b++;
      map[s] = (map[s] || 0) + 1;
      map[g] = (map[g] || 0) - 1;
    }
  }

  return `${a}A${b}B`;
}
