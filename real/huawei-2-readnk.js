// 1st string: R
// 2nd string: BR
// 3rd string: RBBR
// 4th string: BRRBRBBR
// 5th string: RBBRBRRBBRRBRBBR

// read k-index of n-th string
function readnk(n, k) {
  // n-th string will have 2^(n-1) length
  // if k >= 2^(n - 2) => readnk(n-1, k - 2^(n-2))
  // else reverse(readnk(n-1, k))
  if (n <= 0) throw Error('not correct n');
  if (n === 1) {
    if (k === 0) return 'red';
    else throw Error('not correct k');
  } else if (n === 2) {
    if (k === 0) return 'blue';
    else if (k === 1) return 'red';
    else throw Error('not correct k');
  } else {
    if (k >= Math.pow(2, n - 1) || k < 0) {
      throw Error('k is out of range');
    }
    const half = Math.pow(2, n - 2);
    if (k >= half) {
      return readnk(n - 1, k - half);
    } else {
      return readnk(n - 1, k) === 'red' ? 'blue' : 'red';
    }
  }
}

// console.log(readnk(1, 0)) // red
// console.log(readnk(2, 1)) // red
// console.log(readnk(3, 2)) // blue
// console.log(readnk(4, 6)) // blue
// console.log(readnk(5, 4)) // blue
// console.log(readnk(5, 8)) // blue
console.log(readnk(64, 73709551616)); // red
