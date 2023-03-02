// https://leetcode.com/problems/basic-calculator-ii/

// Given a string s which represents an expression, evaluate this expression and return its value.
// The integer division should truncate toward zero.

function calculate(s: string): number {
  if (s == null || s.length === 0) return 0;

  // remove space
  s = s.replace(/\s/g, '');

  const st: number[] = [];
  let n = 0;
  let sign = '+';

  for (let i = 0; i < s.length; i++) {
    const c = s[i];

    // number
    if (/\d/.test(c)) n = n * 10 + Number(c); // e.g. '14' -> 1 * 10 + 4

    // sign or last number
    if (/\D/.test(c) || i === s.length - 1) {
      // if it is addition or subtraction，push this positive or negative number into the array result
      if (sign === '-') st.push(-n);
      else if (sign === '+') st.push(n);
      // if it is multiplication or division, calculate the last number in the array result and the number after the operator
      else if (sign === '*') st.push((st.pop() as number) * n);
      else if (sign === '/') st.push(~~((st.pop() as number) / n));

      sign = c;
      n = 0;
    }
  }
  return st.reduce((a, b) => a + b);
}

// https://leetcode.com/problems/basic-calculator-ii/solutions/415009/javascript-solution/
// https://leetcode.com/problems/basic-calculator-ii/solutions/345603/javascript-stack/
// https://leetcode.com/problems/basic-calculator-ii/solutions/1626067/javascript-o-n-time-o-1-space-with-comments/
