// https://leetcode.com/problems/basic-calculator-iii/
// #stack #hard
// Implement a basic calculator to evaluate a simple expression string.
// The expression string contains only non-negative integers, '+', '-', '*', '/' operators, and open '(' and closing parentheses ')'. The integer division should truncate toward zero.
// You may assume that the given expression is always valid. All intermediate results will be in the range of [-2^31, 2^31 - 1].
// Note: You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as eval().

// Example 1:
// Input: s = "1+1"
// Output: 2

// Example 2:
// Input: s = "6-4/2"
// Output: 4

// Example 3:
// Input: s = "2*(5+5*2)/3+(6/2+8)"
// Output: 21

// https://leetcode.com/problems/basic-calculator-iii/?envType=study-plan-v2&envId=premium-algo-100
function calculate(s: string, i = 0): number | number[] {
  if (!s.length) return 0;

  s = s.trim();

  // utilize a stack since u need to check the entire string for higher priority actions
  const stack: number[] = [];
  let currentNumber = 0;
  let operation = '+';

  while (i < s.length) {
    if (s[i] === '(') {
      i++;
      // eslint-disable-next-line prefer-const
      let [number, index] = calculate(s, i) as number[];
      updateStack(stack, number, operation);
      i = index++;
      operation = s[i++];
      continue;
    } else if (s[i] === ')') {
      updateStack(stack, currentNumber, operation);
      return [getResult(stack), i];
    } else {
      if (!isNaN(Number(s[i])))
        currentNumber =
          currentNumber * 10 + s[i].charCodeAt(0) - '0'.charCodeAt(0);
      if (isNaN(Number(s[i])) || i === s.length - 1) {
        updateStack(stack, currentNumber, operation);
        operation = s[i];
        currentNumber = 0;
      }
    }
    i++;
  }
  return getResult(stack);
}

const updateStack = function (
  stack: number[],
  currentNumber: number,
  operation: string,
) {
  switch (operation) {
    case '+':
      stack.push(currentNumber);
      break;
    case '-':
      stack.push(-currentNumber);
      break;
    case '*':
      stack.push(stack.pop()! * currentNumber);
      break;
    case '/':
      stack.push(Math.trunc(stack.pop()! / currentNumber));
      break;
  }
};

const getResult = function (stack: number[]) {
  return stack.reduce((a, b) => a + b);
};

// https://leetcode.com/problems/basic-calculator-iii/solutions/5081525/straightforward-js-solution-recursive/?envType=study-plan-v2&envId=premium-algo-100
/**
 * @param {string} s
 * @return {number}
 */
function calculate2(s: string): number {
  function helper(s: string[]): number {
    const stack = [];
    let num: number | string = '';
    let sign = '+';
    while (s.length > 0) {
      const curr = s.shift()!;
      if (!isNaN(Number(curr))) {
        num = Number(num) * 10 + parseInt(curr);
      }
      if (curr === '(') {
        num = helper(s);
      }
      if (isNaN(Number(curr)) || s.length === 0) {
        num = Number(num);
        if (sign === '+') {
          stack.push(num);
        }
        if (sign === '-') {
          stack.push(-num);
        }
        if (sign === '*') {
          stack.push(stack.pop()! * num);
        }
        if (sign === '/') {
          stack.push(Math.trunc(stack.pop()! / num));
        }
        num = '';
        sign = curr;
      }
      if (curr === ')') {
        break;
      }
    }
    return stack.reduce((a, b) => a + b, 0);
  }
  return helper(s.replace(/\s+/g, '').split(''));
}
