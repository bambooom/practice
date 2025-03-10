// https://leetcode.com/problems/count-of-substrings-containing-every-vowel-and-k-consonants-ii/
// You are given a string word and a non-negative integer k.
// Return the total number of substrings of word that contain every vowel ('a', 'e', 'i', 'o', and 'u') at least once and exactly k consonants. (辅音)

// Example 1:
// Input: word = "aeioqq", k = 1
// Output: 0
// Explanation:
// There is no substring with every vowel.

// Example 2:
// Input: word = "aeiou", k = 0
// Output: 1
// Explanation:
// The only substring with every vowel and zero consonants is word[0..4], which is "aeiou".

// Example 3:
// Input: word = "ieaouqqieaouqq", k = 1
// Output: 3
// Explanation:
// The substrings with every vowel and one consonant are:
// word[0..5], which is "ieaouq".
// word[6..11], which is "qieaou".
// word[7..12], which is "ieaouq".

// #sliding-window
// https://leetcode.com/problems/count-of-substrings-containing-every-vowel-and-k-consonants-ii/solutions/6309187/javascript-solution/?envType=daily-question&envId=2025-03-10
function countOfSubstrings(word: string, k: number): number {
  let startIndex = 0;
  let endIndex = 0;
  const ob = ['a', 'i', 'e', 'o', 'u'];
  let consonentCount = 0; // number of consonent in current window
  let result = 0;
  let count = 0; // store the count of valid substrings in the current window
  const map = new Map<string, number>(); // [vowel, count] in current window

  while (endIndex < word.length) {
    // Step 1: Process the character at endIndex
    if (ob.includes(word[endIndex])) {
      map.set(word[endIndex], (map.get(word[endIndex]) || 0) + 1);
    } else if (word[endIndex]) {
      consonentCount++;
    }

    // Step 2: Shrink the window if necessary
    while (consonentCount > k) {
      // make consonentCount <= k
      if (ob.includes(word[startIndex])) {
        // decrese in the map
        map.set(word[startIndex], (map.get(word[startIndex]) || 0) - 1);
        if (!map.get(word[startIndex])) {
          map.delete(word[startIndex]);
        }
      } else {
        consonentCount--;
      }
      startIndex++; // shrink the window
    }

    // Step 3: Expand the window if possible
    while (map.size === 5 && consonentCount === k) {
      if (ob.includes(word[startIndex])) {
        // decrese in the map
        map.set(word[startIndex], (map.get(word[startIndex]) || 0) - 1);
        if (!map.get(word[startIndex])) {
          map.delete(word[startIndex]);
        }
      } else {
        consonentCount--;
      }
      count++; // valid substring
      startIndex++;
    }

    // Step 4: Update the result
    result += count;
    // Step 5: Move to the next character
    endIndex++;

    if (word[endIndex] && !ob.includes(word[endIndex])) {
      count = 0;
    }
  }

  return result;
}

// https://leetcode.com/problems/count-of-substrings-containing-every-vowel-and-k-consonants-ii/solutions/5897565/a-switch-o-n-o-1/?envType=daily-question&envId=2025-03-10
// faster solution
function countOfSubstrings2(word: string, k: number) {
  function atMost(word: string, k: number) {
    let a = 0,
      e = 0,
      i = 0,
      o = 0,
      u = 0;
    let count = 0;
    for (let l = 0, r = 0; r < word.length; r++) {
      switch (word[r]) {
        case 'a':
          a++;
          break;
        case 'e':
          e++;
          break;
        case 'i':
          i++;
          break;
        case 'o':
          o++;
          break;
        case 'u':
          u++;
          break;
        default:
          k--;
      }

      while (a && e && i && o && u && k < 0) {
        switch (word[l++]) {
          case 'a':
            a--;
            break;
          case 'e':
            e--;
            break;
          case 'i':
            i--;
            break;
          case 'o':
            o--;
            break;
          case 'u':
            u--;
            break;
          default:
            k++;
        }
      }
      count += r - l + 1;
    }
    return count;
  }
  return atMost(word, k) - atMost(word, k - 1);
}
