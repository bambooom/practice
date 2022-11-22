// A strobogrammatic number is a number that looks the same when rotated 180 degrees (looked at upside down).
// 69 -> upside down, is also 69

// direct convert and compare way
function isStrobogrammatic(num: string): boolean {
  const digits = num.split('').map(Number);
  if (digits.some((d) => [2, 3, 4, 5, 7].includes(d))) {
    return false;
  }

  const convert = digits
    .map((d) => {
      if (d === 9) {
        return 6;
      } else if (d === 6) {
        return 9;
      }
      return d;
    })
    .reverse();

  return Number(digits.join('')) === Number(convert.join(''));
}

function isStrobogrammatic2(num: string): boolean {
  const map = new Map();
  map.set('6', '9');
  map.set('9', '6');
  map.set('8', '8');
  map.set('0', '0');
  map.set('1', '1');

  let left = 0,
    right = num.length - 1;
  while (left <= right) {
    if (map.get(num.charAt(left)) !== num.charAt(right)) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}
