// https://leetcode.com/problems/add-strings/

function addStrings(num1: string, num2: string): string {
  let res = '';
  let over10 = false;
  while (num1 || num2) {
    const d: number =
      (num1 ? parseInt(num1.at(-1) as string) : 0) +
      (num2 ? parseInt(num2.at(-1) as string) : 0) +
      (over10 ? 1 : 0);
    over10 = d >= 10;
    res = `${d % 10}` + res;
    num1 = num1.slice(0, -1);
    num2 = num2.slice(0, -1);
  }

  if (num1 || num2) {
    res = `${parseInt(num1 || num2) + (over10 ? 1 : 0)}` + res;
  } else {
    res = `${over10 ? 1 : ''}` + res;
  }

  return res;
}

console.log(addStrings('1', '9')); // '10'

// two pointers
function addStrings2(num1: string, num2: string): string {
  const n = num1.length;
  const m = num2.length;

  let i = n - 1; // index for num1
  let j = m - 1; // index for num2

  let res = '';
  let carry = 0;

  while (i >= 0 || j >= 0) {
    const dig1 = i < 0 ? 0 : parseInt(num1.charAt(i));
    const dig2 = j < 0 ? 0 : parseInt(num2.charAt(j));

    const sum = dig1 + dig2 + carry;
    const dig3 = sum % 10;
    carry = Math.floor(sum / 10);

    res = dig3 + res;
    i--;
    j--;
  }

  if (carry == 1) {
    res = carry + res;
  }

  return res;
}
