// https://leetcode.com/problems/ternary-expression-parser/description/
// #stack
// Given a string expression representing arbitrarily nested ternary expressions, evaluate the expression, and return the result of it.
// You can always assume that the given expression is valid and only contains digits, '?', ':', 'T', and 'F' where 'T' is true and 'F' is false. All the numbers in the expression are one-digit numbers (i.e., in the range [0, 9]).
// The conditional expressions group right-to-left (as usual in most languages), and the result of the expression will always evaluate to either a digit, 'T' or 'F'.

// Example 1:
// Input: expression = "T?2:3"
// Output: "2"
// Explanation: If true, then result is 2; otherwise result is 3.

// Example 2:
// Input: expression = "F?1:T?4:5"
// Output: "4"
// Explanation: The conditional expressions group right-to-left. Using parenthesis, it is read/evaluated as:
// "(F ? 1 : (T ? 4 : 5))" --> "(F ? 1 : 4)" --> "4"
// or "(F ? 1 : (T ? 4 : 5))" --> "(T ? 4 : 5)" --> "4"

// Example 3:
// Input: expression = "T?T?F:5:3"
// Output: "F"
// Explanation: The conditional expressions group right-to-left. Using parenthesis, it is read/evaluated as:
// "(T ? (T ? F : 5) : 3)" --> "(T ? F : 3)" --> "F"
// "(T ? (T ? F : 5) : 3)" --> "(T ? F : 5)" --> "F"

function parseTernary(expression: string): string {
  const stack: string[] = [];
  for (let i = expression.length - 1; i >= 0; i--) {
    if (expression[i] === ':') continue;
    if (expression[i] !== '?') {
      stack.push(expression[i]);
      continue;
    }
    i--; // move ahead in the iteration
    const first = stack.pop();
    const second = stack.pop();
    if (expression[i] === 'T') {
      stack.push(first!);
    } else {
      stack.push(second!);
    }
  }

  return stack.pop()!;
}

// https://leetcode.com/problems/ternary-expression-parser/solutions/3799672/javascript-stack/?envType=study-plan-v2&envId=premium-algo-100
function parseTernary2(expression: string): string {
  const n = expression.length;
  const stack: string[] = [];
  let i = n - 1;

  while (i >= 0) {
    if (expression[i] !== '?') {
      stack.push(expression[i]);
      i--;
      continue;
    }

    const left = expression[i - 1];
    if (left === 'F') {
      for (let j = 0; j < 2; j++) stack.pop();
    } else {
      const insertedVal = stack.pop();
      for (let j = 0; j < 2; j++) stack.pop();
      stack.push(insertedVal!);
    }
    i -= 2;
  }

  return stack[0]!;
}

// hack, using Regex
// https://leetcode.com/problems/ternary-expression-parser/solutions/3801334/simple-solution-4-lines-using-regular-expressions/?envType=study-plan-v2&envId=premium-algo-100
function parseTernary3(expression: string): string {
  while (expression.length > 1) {
    expression = expression.replace(
      /([TF])\?([TF0-9]):([TF0-9])(?!\?)/,
      (_, a, t, f) => (a === 'T' ? t : f),
    );
  }

  return expression;
}
