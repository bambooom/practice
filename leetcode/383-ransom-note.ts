// Given two strings `ransomNote` and `magazine`,
// return `true` if `ransomNote` can be constructed by using the letters
// from `magazine` and `false` otherwise.
// Each letter in `magazine` can only be used once in `ransomNote`

function canConstruct(ransomNote: string, magazine: string): boolean {
  const source: Map<string, number> = new Map();
  for (let i = 0; i < magazine.length; i++) {
    const c = magazine[i];
    if (source.has(c)) {
      source.set(c, (source.get(c) as number) + 1);
    } else {
      source.set(c, 1);
    }
  }

  for (let i = 0; i < ransomNote.length; i++) {
    const c = ransomNote[i];
    if (!source.has(c)) {
      return false;
    } else {
      const count = source.get(c) as number;
      if (count === 1) {
        source.delete(c);
      } else {
        source.set(c, count - 1);
      }
    }
  }

  return true;
}

/**
 * Approach 1 - simulation
 *  For each char in ransomNote:
      Find that letter in magazine.
      If it is in magazine:
          Remove it from magazine.
      Else:
          Return False
    Return True

 * Time: O(m*n) Space O(m)
 */

/**
 * Approach 2 - 2 hashmap, for both string, and compare the map one by one
 * Approach 3 - 1 hashmap, like preivously I coded
 * Time: O(m), Space O(k), hashmap constant, and will not over 26, can also take it as O(1)
 */

/**
 * Approach 4 - sorting and stacks, better than 1, but worse than 2,3
 *
 * - sort 2 arrays, convert each array into a stack.
 * - Compare the tops of the stacks. There are three possibilities.
    - The characters are the same, we've found a copy of the letter we need in the magazine, for a letter in our ransom note. So pop the top off each stack.
    - The ransom note character is earlier in the alphabet than the magazine character. For the second possibility, we know that the letter we need can't be on the magazine stack. This is because all the other characters on the magazine must be even later than the top, and we needed an earlier letter. Therefore, we can return false now.
    - The ransom note character is later in the alphabet than the magazine character. For the third possibility, we know that the letter on the top of the magazine stack will never be needed, as all the characters on the ransom note stack must be later than it, so we pop the top off just the magazine stack.
 */
