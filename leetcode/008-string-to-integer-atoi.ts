// https://leetcode.com/problems/string-to-integer-atoi/

// just do as steps, not the best way
function myAtoi(s: string): number {
  const len = s.length;
  let result = 0;
  let sign = 1;

  for (let i = 0; i < len; i++) {
    // skip whitespace
    if (s[i] === ' ') continue;
    // sign
    if (s[i] === '+' || s[i] === '-') {
      sign = s[i] === '-' ? -1 : 1;
      if (!/[0-9]/.test(s[i + 1])) {
        return 0;
      }
    }

    if (/[0-9]/.test(s[i])) {
      result = result * 10 + +s[i];
      if (!/[0-9]/.test(s[i + 1])) {
        break;
      }
    }

    // break point
    if (/[a-zA-Z.]/.test(s[i])) {
      return 0;
    }
  }

  return sign === -1
    ? Math.max(-(2 ** 31), -result)
    : Math.min(2 ** 31 - 1, result);
}

// parse by regex
function myAtoi2(s: string): number {
  return Math.min(
    Math.pow(2, 31) - 1,
    Math.max(
      parseInt(s.match(/^\s*([-+]?\d+)/)?.[1] ?? '0', 10),
      -Math.pow(2, 31),
    ),
  );
}

// not one-liner
function myAtoi3(s: string): number {
  const MIN_NUM = -Math.pow(2, 31);
  const MAX_NUM = Math.pow(2, 31) - 1;
  const res = parseInt(s) || 0;

  if (!(res >= MIN_NUM && res <= MAX_NUM)) {
    return res < 0 ? MIN_NUM : MAX_NUM;
  }

  return res;
}

//
function myAtoi4(s: string): number {
  let atoiString = '';
  let isNegative = false;

  s = s.trimStart();
  for (let i = 0; i < s.length; i++) {
    if (i == 0 && s[0] == '-') {
      isNegative = true;
      continue;
    } else if (i == 0 && s[0] == '+') continue;

    if (isNaN(parseInt(s[i]))) break;
    atoiString += s[i];
  }

  if (atoiString == '' || atoiString == '0') return 0;
  if (parseInt(atoiString) > 2147483647)
    return isNegative ? -2147483648 : 2147483647;
  return isNegative ? parseInt(atoiString) * -1 : parseInt(atoiString);
}
