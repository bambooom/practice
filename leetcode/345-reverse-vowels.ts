const VOW = ['a', 'e', 'i', 'o', 'u'];

function reverseVowels(s: string): string {
  const vowels: { [key: string]: number | string }[] = [];
  const chars = s.split('');
  chars.forEach((c, i) => {
    if (VOW.includes(c.toLowerCase())) {
      vowels.push({
        char: c,
        idx: i,
      });
    }
  });
  vowels
    .map((item) => item.char)
    .reverse()
    .forEach((v, i) => {
      const idx = vowels[i].idx as number;
      chars[idx] = v as string;
    });
  return chars.join('');
}

// console.log(reverseVowels('aA'));

/**
 * 2-pointer Algorithm is better, time O(N), space O(N)

1. Initialize the left pointer start to 0, and the right pointer end to s.size() - 1.
2. Keep iterating until the left pointer catches up with the right pointer:
    2.1 Keep incrementing the left pointer start until it's pointing to a vowel character.
    2.2 Keep decrementing the right pointer end until it's pointing to a vowel character.
    2.3 Swap the characters at the start and end.
    2.4 Increment the start pointer and decrement the end pointer.
3. Return the string s.
 */

function reverseV(s: string): string {
  let left = 0;
  let right = s.length - 1;
  const chars = s.split('');
  while (left < right) {
    while (left < right && !VOW.includes(chars[left].toLowerCase())) {
      left++;
    }
    while (right > left && !VOW.includes(chars[right].toLowerCase())) {
      right--;
    }
    if (left < right) {
      [chars[left], chars[right]] = [chars[right], chars[left]];
      left++;
      right--;
    }
  }
  return chars.join('');
}

console.log(reverseV('leetcode')); // leotcede
