// https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/

type item = { c: string; i: number };

function minRemoveToMakeValid(s: string): string {
  if (!s) return '';
  const stacks: item[] = [];
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === '(') {
      stacks.push({ c, i });
    } else if (c === ')') {
      if (stacks.length && (stacks.at(-1) as item).c === '(') {
        stacks.pop();
      } else {
        stacks.push({ c, i });
      }
    }
  }
  let res = '';
  let prev = -1;
  if (stacks.length) {
    stacks.forEach((n, idx) => {
      if (idx === 0) {
        res += s.substring(0, n.i);
      } else if (idx >= 1) {
        res += s.substring(prev + 1, n.i);
      }
      prev = n.i;
      if (idx === stacks.length - 1) {
        res += s.substring(prev + 1, s.length);
      }
    });
  } else {
    res = s;
  }
  return res;
}

console.log(minRemoveToMakeValid('lee(t(c)o)de)')); // lee(t(c)o)de
console.log(minRemoveToMakeValid('abc')); // abc

// better solution, using 2 arrays
function minRemoveToMakeValid2(str: string): string {
  const strs = str.split('');
  const stack = [];
  for (let i = 0; i < strs.length; i++) {
    if (strs[i] === '(') stack.push(i);
    else if (strs[i] === ')') {
      if (stack.length) stack.pop();
      else strs[i] = '';
    }
  }

  for (const i of stack) {
    strs[i] = '';
  }

  return strs.join('');
}
