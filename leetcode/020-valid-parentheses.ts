const brackets: Record<string, string> = {
  '(': ')',
  '{': '}',
  '[': ']',
};

// using stack:
// for open brackets, push to stack
// for closing bracets, pop the stack and check corresponding or not
export function isValid(s: string): boolean {
  const stack: string[] = [];
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (Object.keys(brackets).includes(c)) {
      stack.push(c);
    } else {
      const tmp = stack.pop() || '';
      if (!(brackets[tmp] === c)) {
        return false;
      }
    }
  }
  return stack.length === 0;
}

// from community
export function isValid2(s: string): boolean {
  while (
    s.indexOf('{}') !== -1 ||
    s.indexOf('[]') !== -1 ||
    s.indexOf('()') !== -1
  ) {
    s = s.replace('()', '');
    s = s.replace('{}', '');
    s = s.replace('[]', '');
  }
  return s === '';
}
