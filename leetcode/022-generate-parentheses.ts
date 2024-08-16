// https://leetcode.com/problems/generate-parentheses
// Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

// Example 1:
// Input: n = 3
// Output: ["((()))","(()())","(())()","()(())","()()()"]
// Example 2:
// Input: n = 1
// Output: ["()"]

// https://leetcode.com/problems/generate-parentheses/solutions/3375419/typescript-javascript-recursive-approach-to-generate-valid-parens/?envType=study-plan-v2&envId=top-100-liked
// recursive, backtracking
function generateParenthesis(n: number): string[] {
  const res: string[] = [];

  const recursive = (
    openParens: number,
    closedParens: number,
    combo: string,
  ) => {
    if (openParens === 0 && closedParens === 0) {
      res.push(combo);
      return;
    }

    // if there are open parens to close
    if (openParens < closedParens) {
      recursive(openParens, closedParens - 1, combo + ')');
    }

    // if there are open parens left to use
    if (openParens > 0) {
      recursive(openParens - 1, closedParens, combo + '(');
    }
  };

  recursive(n, n, '');

  return res;
}

// https://leetcode.com/problems/generate-parentheses/solutions/4847926/js-ts-solution-two-solutions-iterative-and-recursive/?envType=study-plan-v2&envId=top-100-liked
// iterative stack dfs
function generateParenthesis2(n: number): string[] {
  const res: string[] = [];
  const stacks = [
    {
      open: 0,
      close: 0,
      str: '',
    },
  ];

  while (stacks.length) {
    const { open, close, str } = stacks.pop()!;

    if (str.length === n * 2) {
      res.push(str);
    }

    if (open > close) {
      stacks.push({ open, close: close + 1, str: str + ')' });
    }

    if (open < n) {
      stacks.push({ open: open + 1, close, str: str + '(' });
    }
  }

  return res;
}
