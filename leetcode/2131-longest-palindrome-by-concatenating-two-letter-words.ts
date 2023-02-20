// https://leetcode.com/problems/longest-palindrome-by-concatenating-two-letter-words/
// You are given an array of strings words. Each element of words consists of two lowercase English letters.
// Create the longest possible palindrome by selecting some elements from words and concatenating them in any order. Each element can be selected at most once.
// Return the length of the longest palindrome that you can create. If it is impossible to create any palindrome, return 0.
// A palindrome is a string that reads the same forward and backward.
// #hash-table #greedy

// Input: words = ["lc","cl","gg"]
// Output: 6
// Explanation: One longest palindrome is "lc" + "gg" + "cl" = "lcggcl", of length 6.
// Note that "clgglc" is another longest palindrome that can be created.

const reverseStr = (str: string): string => str.split('').reverse().join('');

function longestPalindrome(words: string[]): number {
  // We define the object that will hold the occurrences of the words in the words array and a counter that will count the length of the palindrome stirng.
  const obj: Record<string, number> = {};
  let counter = 0;

  for (const word of words) {
    // We reverse each word in the array.
    const reversedWord = reverseStr(word);

    // We check, if the original word is in the array, that means we have a palindrome. So we decrement from the occurence of the word in the hash and increment the counter by 4 because that means we have a string with length of 4 that is a palindrome.
    if (obj[word]) {
      obj[word]--;
      counter += 4;

      // Else, that means we don't have the word in the hash, so we want to save the occurence of it as a reversed word.
    } else {
      obj[reversedWord] = obj[reversedWord] + 1 || 1;
    }
  }

  // We check if there are any more occurences of a palindrome word. We do that by filtering the keys of the object, inside of the filter we check wether the current string has any occurences in the hash AND if the reversed string is equal to the original string from the hash.
  const hashGotMorePalindromes: string[] = Object.keys(obj).filter(
    (str) => obj[str] && reverseStr(str) === str,
  );

  // If we have any of the values mentioned above, we increment the counter by 2.
  if (hashGotMorePalindromes.length) {
    counter += 2;
  }

  return counter;
}
