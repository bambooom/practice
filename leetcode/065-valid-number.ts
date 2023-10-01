// https://leetcode.com/problems/valid-number/

// A valid number can be split up into these components (in order):

// 1. A decimal number or an integer.
// 2. (Optional) An 'e' or 'E', followed by an integer.

// A decimal number can be split up into these components (in order):
// 1. (Optional) A sign character (either '+' or '-').
// 2. One of the following formats:
//    One or more digits, followed by a dot '.'.
//    One or more digits, followed by a dot '.', followed by one or more digits.
//    A dot '.', followed by one or more digits.

// An integer can be split up into these components (in order):
// 1. (Optional) A sign character (either '+' or '-').
// 2. One or more digits.

// all the following are valid numbers: ["2", "0089", "-0.1", "+3.14", "4.", "-.9", "2e10", "-90E3", "3e+7", "+6e-1", "53.5e93", "-123.456e789"],
// while the following are not valid numbers: ["abc", "1a", "1e", "e3", "99e2.5", "--6", "-+3", "95a54e53"].

// via regex
function isNumber(s: string): boolean {
  s = s.trim();
  // const isDecimal = /[+-]?((\d+\.(\d*)?)|\.\d+)/
  // const isInteger = /[+-]?\d+/

  return /^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(s);
}

//quirk 1
function isNumber2(s: string): boolean {
  return !/\d/.test(s) && isNaN(+s[0]) ? false : !isNaN(+s);
}

//quirk 2
function isNumber3(s: string): boolean {
  if (s === 'Infinity' || s === '-Infinity' || s === '+Infinity') return false;
  return !isNaN(Number(s));
}

// straight forward parse and check
function isNumber4(s: string): boolean {
  let exp = false,
    sign = false,
    num = false,
    dec = false;
  for (const c of s)
    if (c >= '0' && c <= '9') num = true;
    else if (c === 'e' || c === 'E')
      if (exp || !num) return false;
      else (exp = true), (sign = false), (num = false), (dec = false);
    else if (c === '+' || c === '-')
      if (sign || num || dec) return false;
      else sign = true;
    else if (c === '.')
      if (dec || exp) return false;
      else dec = true;
    else return false;
  return num;
}
