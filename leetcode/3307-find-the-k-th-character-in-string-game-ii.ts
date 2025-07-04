// https://leetcode.com/problems/find-the-k-th-character-in-string-game-ii
// Alice and Bob are playing a game. Initially, Alice has a string word = "a".
// You are given a positive integer k. You are also given an integer array operations, where operations[i] represents the type of the ith operation.
// Now Bob will ask Alice to perform all operations in sequence:
// If operations[i] == 0, append a copy of word to itself.
// If operations[i] == 1, generate a new string by changing each character in word to its next character in the English alphabet, and append it to the original word. For example, performing the operation on "c" generates "cd" and performing the operation on "zb" generates "zbac".
// Return the value of the kth character in word after performing all the operations.
// Note that the character 'z' can be changed to 'a' in the second type of operation.

// Example 1:
// Input: k = 5, operations = [0,0,0]
// Output: "a"
// Explanation:
// Initially, word == "a". Alice performs the three operations as follows:
// Appends "a" to "a", word becomes "aa".
// Appends "aa" to "aa", word becomes "aaaa".
// Appends "aaaa" to "aaaa", word becomes "·aaaaaaaa".

// Example 2:
// Input: k = 10, operations = [0,1,0,1]
// Output: "b"
// Explanation:
// Initially, word == "a". Alice performs the four operations as follows:
// Appends "a" to "a", word becomes "aa".
// Appends "bb" to "aa", word becomes "aabb".
// Appends "aabb" to "aabb", word becomes "aabbaabb".
// Appends "bbccbbcc" to "aabbaabb", word becomes "aabbaabbbbccbbcc".

// https://leetcode.com/problems/find-the-k-th-character-in-string-game-ii/solutions/5858141/2-different-approaches-with-explanations-and-examples/?envType=daily-question&envId=2025-07-04
// Not all of the operations are important for k-th character. Any operation which is applied to the string that already has length of k will not change the result, so we will apply only first n operations.
// After n-th operation, length of the string is 2^n, and on previous step is was 2^(n-1)
// Kth character lays on the second half of the string, because it wasn't present in 2^(n−1) length string.
// K-th character took its value from k−2^(n−1) character, and shifted char code by value of n-th operation.
//    rec(k) = rec(k - 2 ^ (n - 1)) + operation[n - 1]
//    rec(1) = 0 // 1st character is always 'a' (shift = 0)
// 1.recursion
function kthCharacterII(k: number, operations: number[]): string {
  const findShift = (k: number): number => {
    if (k === 1) return 0;
    const n = Math.ceil(Math.log2(k));
    return findShift(k - 2 ** (n - 1)) + operations[n - 1];
  };

  return String.fromCharCode('a'.charCodeAt(0) + (findShift(k) % 26));
}

// 2.bitmask
// To reach k-th character, we need to extend initial string 'a' with k - 1 characters. After i-th operation we add 2^i
// characters (which can be represented by i-th bit), and we shift them by value of i-th operation.
function kthCharacterII2(k: number, operations: number[]): string {
  const bitMask = [...(k - 1).toString(2)].map(Number).reverse();
  const shift = bitMask.reduce(
    (shift, bit, i) => shift + bit * operations[i],
    0,
  );

  return String.fromCharCode('a'.charCodeAt(0) + (shift % 26));
}
