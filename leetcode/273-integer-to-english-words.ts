// https://leetcode.com/problems/integer-to-english-words
// Convert a non-negative integer num to its English words representation.

// Example 1:
// Input: num = 123
// Output: "One Hundred Twenty Three"
// Example 2:
// Input: num = 12345
// Output: "Twelve Thousand Three Hundred Forty Five"
// Example 3:
// Input: num = 1234567
// Output: "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"

// https://leetcode.com/problems/integer-to-english-words/solutions/4468165/very-short-and-readable/?envType=daily-question&envId=2024-08-07
// recursion, iterate over the whole hashmap, not the fast, but straightforward without edgecase
function numberToWords(num: number): string {
  const NUMBERS = new Map<number, string>([
    [1e9, 'Billion'],
    [1e6, 'Million'],
    [1e3, 'Thousand'],
    [1e2, 'Hundred'],
    [90, 'Ninety'],
    [80, 'Eighty'],
    [70, 'Seventy'],
    [60, 'Sixty'],
    [50, 'Fifty'],
    [40, 'Forty'],
    [30, 'Thirty'],
    [20, 'Twenty'],
    [19, 'Nineteen'],
    [18, 'Eighteen'],
    [17, 'Seventeen'],
    [16, 'Sixteen'],
    [15, 'Fifteen'],
    [14, 'Fourteen'],
    [13, 'Thirteen'],
    [12, 'Twelve'],
    [11, 'Eleven'],
    [10, 'Ten'],
    [9, 'Nine'],
    [8, 'Eight'],
    [7, 'Seven'],
    [6, 'Six'],
    [5, 'Five'],
    [4, 'Four'],
    [3, 'Three'],
    [2, 'Two'],
    [1, 'One'],
    [0, 'Zero'],
  ]);

  for (const [int, str] of NUMBERS) {
    if (num >= int) {
      const prefix = num >= 100 ? numberToWords(Math.trunc(num / int)) : '';
      const suffix = num % int > 0 ? numberToWords(num % int) : '';
      return `${prefix} ${str} ${suffix}`.trim();
    }
  }

  return '';
}

// https://leetcode.com/problems/integer-to-english-words/solutions/4032098/readable-time-o-logn-space-o-logn/?envType=daily-question&envId=2024-08-07
function numberToWords2(num: number): string {
  const SUB_20 = [
    'Zero',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen',
  ];

  const SUB_100 = [
    '',
    '',
    'Twenty',
    'Thirty',
    'Forty',
    'Fifty',
    'Sixty',
    'Seventy',
    'Eighty',
    'Ninety',
  ];

  const POW_10 = [
    'Hundred',
    'Thousand',
    'Million',
    'Billion', //, ...
  ];

  if (num === 0) return 'Zero';

  const getSub1000 = (buf: string[], num: number): void => {
    if (num >= 100) {
      const mod = num % 100;
      buf.push(SUB_20[(num - mod) / 100], POW_10[0]);
      num = mod;
    }

    if (num >= 20) {
      const mod = num % 10;
      buf.push(SUB_100[(num - mod) / 10]);
      num = mod;
    }

    if (num > 0) {
      buf.push(SUB_20[num]);
    }
  };

  const buf: string[] = [];
  for (let i = POW_10.length - 1; num >= 1000; --i) {
    const p = 1000 ** i;
    if (num >= p) {
      const mod = num % p;
      getSub1000(buf, (num - mod) / p);
      buf.push(POW_10[i]);
      num = mod;
    }
  }

  getSub1000(buf, num);
  return buf.join(' ');
}
