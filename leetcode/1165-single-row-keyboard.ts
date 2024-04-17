// https://leetcode.com/problems/single-row-keyboard/description
// There is a special keyboard with all keys in a single row.
// Given a string keyboard of length 26 indicating the layout of the keyboard (indexed from 0 to 25). Initially, your finger is at index 0. To type a character, you have to move your finger to the index of the desired character. The time taken to move your finger from index i to index j is |i - j|.
// You want to type a string word. Write a function to calculate how much time it takes to type it with one finger.

function calculateTime(keyboard: string, word: string): number {
  let moves = 0;
  let prevIdx = 0;
  for (let i = 0; i < word.length; i++) {
    const nextIdx = keyboard.indexOf(word[i]);
    moves += Math.abs(nextIdx - prevIdx);
    prevIdx = nextIdx;
  }

  return moves;
}
