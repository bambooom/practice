// https://leetcode.com/problems/fraction-addition-and-subtraction/
// Given a string expression representing an expression of fraction addition and subtraction, return the calculation result in string format.

// The final result should be an irreducible fraction. If your final result is an integer, change it to the format of a fraction that has a denominator 1. So in this case, 2 should be converted to 2/1.

// Example 1:
// Input: expression = "-1/2+1/2"
// Output: "0/1"
// Example 2:
// Input: expression = "-1/2+1/2+1/3"
// Output: "1/3"
// Example 3:
// Input: expression = "1/3-1/2"
// Output: "-1/6"

// https://leetcode.com/problems/fraction-addition-and-subtraction/solutions/4480189/simple-typescript-solution-o-n/
function fractionAddition(expression: string): string {
  const exps = expression.match(/^\d+\/\d+|[+-]\d+\/\d+/gm)!;

  let num = 0;
  let denom = 1;
  for (const match of exps) {
    const [n, den] = match.split('/').map(Number);
    num = num * den + n * denom;
    denom *= den;
  }

  const gcd = (a: number, b: number) => {
    if (b === 0) return a;
    return gcd(b, a % b);
  };

  const divisor = Math.abs(gcd(num, denom));

  // Divide the numerator and denominator by the greatest common factor.
  num /= divisor;
  denom /= divisor;

  return num + '/' + denom;
}
