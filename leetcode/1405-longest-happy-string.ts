// https://leetcode.com/problems/longest-happy-string
// A string s is called happy if it satisfies the following conditions:
// - s only contains the letters 'a', 'b', and 'c'.
// - s does not contain any of "aaa", "bbb", or "ccc" as a substring.
// - s contains at most a occurrences of the letter 'a'.
// - s contains at most b occurrences of the letter 'b'.
// - s contains at most c occurrences of the letter 'c'.
// Given three integers a, b, and c, return the longest possible happy string. If there are multiple longest happy strings, return any of them. If there is no such string, return the empty string "".
// A substring is a contiguous sequence of characters within a string.

// Example 1:
// Input: a = 1, b = 1, c = 7
// Output: "ccaccbcc"
// Explanation: "ccbccacc" would also be a correct answer.

// Example 2:
// Input: a = 7, b = 1, c = 0
// Output: "aabaa"
// Explanation: It is the only correct answer in this case.

// https://leetcode.com/problems/longest-happy-string/solutions/5918603/explained-step-by-step-beats-100-o-n-working-16-10-2024/?envType=daily-question&envId=2024-10-16
function longestDiverseString(a: number, b: number, c: number): string {
  // create an array of character-count tuples
  const chars: [string, number][] = [
    ['a', a],
    ['b', b],
    ['c', c],
  ];

  // initialize the result array and calculate total character
  const ans: string[] = [];
  const sum = a + b + c;

  // continue building the string until we've used all characters or can't add more
  while (ans.length < sum) {
    const n = ans.length;

    // sort the chars array based on count in descending order
    chars.sort(([, c1], [, c2]) => c2 - c1);

    // choose which character to add next
    // if last two characters are the same as the most frequent remaining character,
    // choose the second most frequent to avoid three consecutive same characters
    const char: [string, number] =
      ans[n - 1] === ans[n - 2] && ans[n - 1] === chars[0][0]
        ? chars[1]
        : chars[0];

    // if the chosen character has count 0, we can't add more characters
    if (char[1] === 0) {
      break;
    }

    // add the chosen character to the result
    ans.push(char[0]);

    // decreate the count of the used character
    char[1]--;
  }

  return ans.join('');
}

// https://leetcode.com/problems/longest-happy-string/solutions/5918572/greedy-algorithm/?envType=daily-question&envId=2024-10-16
// greedy
// faster than previout solution?
function longestDiverseString2(a: number, b: number, c: number): string {
  const res: string[] = [];
  const freqs: Record<string, number> = { a: a, b: b, c: c };

  const getMaxNot = (excludeKey: string | null = null) => {
    return Object.keys(freqs).reduce<[string | null, number]>(
      (aggr: [string | null, number], next: string) => {
        if (
          freqs[next] === 0 ||
          next === excludeKey ||
          freqs[next] <= aggr[1]
        ) {
          return aggr;
        }
        return [next, freqs[next]];
      },
      [null, -Infinity],
    );
  };

  let prev = null;

  for (
    let [char, freq] = getMaxNot();
    char !== null;
    [char, freq] = getMaxNot(prev)
  ) {
    const amount = freq >= (freqs[prev!] ?? 0) ? Math.min(2, freq) : 1;
    res.push(char.repeat(amount));
    freqs[char] -= amount;
    prev = char;
  }

  return res.join('');
}
