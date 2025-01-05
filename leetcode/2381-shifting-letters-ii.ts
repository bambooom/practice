// https://leetcode.com/problems/shifting-letters-ii/description
// You are given a string s of lowercase English letters and a 2D integer array shifts where shifts[i] = [starti, endi, directioni]. For every i, shift the characters in s from the index starti to the index endi (inclusive) forward if directioni = 1, or shift the characters backward if directioni = 0.
// Shifting a character forward means replacing it with the next letter in the alphabet (wrapping around so that 'z' becomes 'a'). Similarly, shifting a character backward means replacing it with the previous letter in the alphabet (wrapping around so that 'a' becomes 'z').
// Return the final string after all such shifts to s are applied.

// Example 1:
// Input: s = "abc", shifts = [[0,1,0],[1,2,1],[0,2,1]]
// Output: "ace"
// Explanation: Firstly, shift the characters from index 0 to index 1 backward. Now s = "zac".
// Secondly, shift the characters from index 1 to index 2 forward. Now s = "zbd".
// Finally, shift the characters from index 0 to index 2 forward. Now s = "ace".

// Example 2:
// Input: s = "dztz", shifts = [[0,0,0],[1,1,1]]
// Output: "catz"
// Explanation: Firstly, shift the characters from index 0 to index 0 backward. Now s = "cztz".
// Finally, shift the characters from index 1 to index 1 forward. Now s = "catz".

// https://leetcode.com/problems/shifting-letters-ii/solutions/6231826/100-80-using-differences-array-in-typescript/
function shiftingLetters(s: string, shifts: number[][]): string {
  // initialize differences array
  const shiftList = new Array(s.length + 1).fill(0);
  shifts.forEach(([start, end, direction]) => {
    // add +1 if right, -1 if left
    shiftList[start] += direction === 1 ? 1 : -1;
    // subtract -1 if left, +1 if right
    shiftList[end + 1] += direction === 1 ? -1 : 1;
  });

  for (let i = 1; i < s.length; i++) {
    // use prefix sum to calculate the cumulative shift for each character in the string
    shiftList[i] += shiftList[i - 1];
  }

  return s
    .split('')
    .map((char, i) => {
      const c = char.charCodeAt(0) - 97;
      const shiftAmount = ((shiftList[i] % 26) + 26) % 26;
      return String.fromCharCode(((c + shiftAmount) % 26) + 97);
    })
    .join('');
}

// https://leetcode.com/problems/shifting-letters-ii/solutions/3490375/translate-lachezartsk-s-javascript-to-typescript/
function shiftingLetters2(input: string, shifts: number[][]): string {
  const ALPHABET_SIZE = 26;
  const ASCII_SMALL_CASE_A = 97;
  const totalShifts = new Array(input.length + 1).fill(0);

  for (const shift of shifts) {
    const change = shift[2] === 1 ? 1 : -1;
    totalShifts[shift[0]] += change;
    totalShifts[shift[1] + 1] -= change;
  }

  const shiftedLetters = input.split('');
  for (let i = 0; i < input.length; ++i) {
    const currentShift =
      (input.codePointAt(i)! -
        ASCII_SMALL_CASE_A +
        (totalShifts[i] % ALPHABET_SIZE) +
        ALPHABET_SIZE) %
      ALPHABET_SIZE;
    shiftedLetters[i] = String.fromCodePoint(currentShift + ASCII_SMALL_CASE_A);
    totalShifts[i + 1] += totalShifts[i];
  }

  return shiftedLetters.join('');
}
