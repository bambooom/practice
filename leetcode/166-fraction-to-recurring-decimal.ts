// https://leetcode.com/problems/fraction-to-recurring-decimal/
// Given two integers representing the numerator and denominator of a fraction, return the fraction in string format.
// If the fractional part is repeating, enclose the repeating part in parentheses.
// If multiple answers are possible, return any of them.
// It is guaranteed that the length of the answer string is less than 104 for all the given inputs.

// Example 1:

// Input: numerator = 1, denominator = 2
// Output: "0.5"
// Example 2:

// Input: numerator = 2, denominator = 1
// Output: "2"
// Example 3:

// Input: numerator = 4, denominator = 333
// Output: "0.(012)"

// https://leetcode.com/problems/fraction-to-recurring-decimal/solutions/7218738/solution-with-long-division-simulation-and-hashmap/?envType=daily-question&envId=2025-09-24
// HashMap for remainder position tracking and cycle detection
function fractionToDecimal(numerator: number, denominator: number): string {
  if (numerator === 0) return '0';

  const sign = numerator < 0 !== denominator < 0 ? '-' : '';

  let num = Math.abs(numerator);
  let den = Math.abs(denominator);
  let result: string[] = [sign + Math.floor(num / den).toString()];
  let remainder = num % den;

  if (remainder === 0) {
    return result.join('');
  }

  // decimal part
  result.push('.');

  const seen = new Map<number, number>();
  while (remainder !== 0) {
    if (seen.has(remainder)) {
      // loop
      const pos = seen.get(remainder)!;
      return (
        result.slice(0, pos).join('') + '(' + result.slice(pos).join('') + ')'
      );
    }

    seen.set(remainder, result.length);
    remainder *= 10;
    result.push(Math.floor(remainder / den).toString());
    remainder %= den;
  }

  return result.join('');
}
