// https://leetcode.com/problems/reverse-words-in-a-string-iii

function reverseString(s: string[]): void {
  let i = 0;
  let j = s.length - 1;
  while (i < j) {
    [s[i], s[j]] = [s[j], s[i]];
    i++;
    j--;
  }
}

function reverseWords(s: string): string {
  return s
    .split(' ')
    .map((w) => {
      const arr = w.split('');
      reverseString(arr);
      return arr.join('');
    })
    .join(' ');
}
