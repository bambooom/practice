// https://leetcode.com/problems/vowels-game-in-a-string
// Alice and Bob are playing a game on a string.
// You are given a string s, Alice and Bob will take turns playing the following game where Alice starts first:
// On Alice's turn, she has to remove any non-empty substring from s that contains an odd number of vowels.
// On Bob's turn, he has to remove any non-empty substring from s that contains an even number of vowels.
// The first player who cannot make a move on their turn loses the game. We assume that both Alice and Bob play optimally.
// Return true if Alice wins the game, and false otherwise.
// The English vowels are: a, e, i, o, and u.

// Example 1:
// Input: s = "leetcoder"
// Output: true
// Explanation:
// Alice can win the game as follows:
// Alice plays first, she can delete the underlined substring in s = "leetcoder" which contains 3 vowels. The resulting string is s = "der".
// Bob plays second, he can delete the underlined substring in s = "der" which contains 0 vowels. The resulting string is s = "er".
// Alice plays third, she can delete the whole string s = "er" which contains 1 vowel.
// Bob plays fourth, since the string is empty, there is no valid play for Bob. So Alice wins the game.

// Example 2:
// Input: s = "bbcd"
// Output: false
// Explanation:
// There is no valid play for Alice in her first turn, so Alice loses the game.

// https://leetcode.com/problems/vowels-game-in-a-string/solutions/7180481/vowels-game-in-a-string-with-proof-beats-100/?envType=daily-question&envId=2025-09-12
// intuition: no matter what Bob does, if a vowel exists, Alice will always have a valid move because she moves first.
function doesAliceWin(s: string): boolean {
  for (let i = 0; i < s.length; i++) {
    // check if s[i] is a vowel, this expression evaluates to 1 if the character is a vowel, and 0 otherwise.
    // 0x104111 = bitmask for vowels = 0b00000000000100000100000100010001
    // s[i] - 97 = remaps characters a-z to 0, 1, 2, ..., 25
    // >> right shift the bitmask by the character's index
    // & 1 = extracts the least significant bit (LSB) to test membership
    if ((0x104111 >> (s.charCodeAt(i) - 97)) & 1) {
      return true;
    }
  }
  return false;
}
