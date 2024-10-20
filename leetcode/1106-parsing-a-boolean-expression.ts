// https://leetcode.com/problems/parsing-a-boolean-expression
// A boolean expression is an expression that evaluates to either true or false. It can be in one of the following shapes:
//  - 't' that evaluates to true.
//  - 'f' that evaluates to false.
//  - '!(subExpr)' that evaluates to the logical NOT of the inner expression subExpr.
//  - '&(subExpr1, subExpr2, ..., subExprn)' that evaluates to the logical AND of the inner expressions subExpr1, subExpr2, ..., subExprn where n >= 1.
//  - '|(subExpr1, subExpr2, ..., subExprn)' that evaluates to the logical OR of the inner expressions subExpr1, subExpr2, ..., subExprn where n >= 1.
// Given a string expression that represents a boolean expression, return the evaluation of that expression.
// It is guaranteed that the given expression is valid and follows the given rules.

// Example 1:
// Input: expression = "&(|(f))"
// Output: false
// Explanation:
// First, evaluate |(f) --> f. The expression is now "&(f)".
// Then, evaluate &(f) --> f. The expression is now "f".
// Finally, return false.

// Example 2:
// Input: expression = "|(f,f,f,t)"
// Output: true
// Explanation: The evaluation of(false OR false OR false OR true) is true.

// Example 3:
// Input: expression = "!(&(f,t))"
// Output: true
// Explanation:
// First, evaluate &(f,t) --> (false AND true) --> false --> f. The expression is now "!(f)".
// Then, evaluate !(f) --> NOT false --> true. We return true.

// https://leetcode.com/problems/parsing-a-boolean-expression/solutions/5939327/beats-100-o-n-log-n-working-20-10-2024/
function parseBoolExpr(expression: string): boolean {
  // store the input expression
  const expr = expression;
  const n = expr.length;
  // initializa a pointer to traverse the expression
  let i = 0;

  const dfs = (): boolean[] => {
    // Array to store boolean results of sub-expressions
    const res: boolean[] = [];

    // Traverse the expression
    while (i < n) {
      // Get the current character and move the pointer
      const c = expr[i++];

      // If we encounter a closing parenthesis, end this sub-expr
      if (c === ')') {
        break;
      }

      // handle diff operators and values
      if (c === '!') {
        // NOT operator
        res.push(!dfs()[0]);
      } else if (c === '|') {
        // OR operator
        res.push(dfs().some((v) => v));
      } else if (c === '&') {
        // AND operator
        res.push(dfs().every((v) => v));
      } else if (c === 't') {
        // true
        res.push(true);
      } else if (c === 'f') {
        // false
        res.push(false);
      }

      // Note: Opening parenthesis '(' is implicitly handled by recursive calls
    }

    return res;
  };

  // start parsing process and return the final result
  // we take the first (and only) element of the result array
  return dfs()[0];
}
