// https://leetcode.com/problems/minimum-number-of-pushes-to-type-word-ii
// You are given a string word containing lowercase English letters.
// Telephone keypads have keys mapped with distinct collections of lowercase English letters, which can be used to form words by pushing them. For example, the key 2 is mapped with ["a","b","c"], we need to push the key one time to type "a", two times to type "b", and three times to type "c" .
// It is allowed to remap the keys numbered 2 to 9 to distinct collections of letters. The keys can be remapped to any amount of letters, but each letter must be mapped to exactly one key. You need to find the minimum number of times the keys will be pushed to type the string word.
// Return the minimum number of pushes needed to type word after remapping the keys.
// An example mapping of letters to keys on a telephone keypad is given below. Note that 1, *, #, and 0 do not map to any letters.

// #hash-table #greedy
// https://leetcode.com/problems/minimum-number-of-pushes-to-type-word-ii/solutions/5594016/simple-code-with-explanation-95-beats-in-every-language/?envType=daily-question&envId=2024-08-06
function minimumPushes(word: string): number {
  if (word.length <= 8) return word.length;
  const count = new Array(26).fill(0);

  // count the freq of each letter
  for (const c of word) {
    count[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
  }
  // sort the freq
  count.sort((a, b) => a - b);

  let pushes = 0;
  let multiplier = 1;

  // iterate from highest freq to lowest
  // each time add the pushes count as the count freq and multiplier (%8)
  // so that we ensure the least freq are assigned the highest multiplier
  for (let i = 25; i >= 0; i--) {
    if (count[i] === 0) {
      break;
    }
    pushes += count[i] * multiplier;
    // mod 8 as only 2-9 keys can be used
    if ((25 - i + 1) % 8 === 0) {
      multiplier++;
    }
  }

  return pushes;
}
