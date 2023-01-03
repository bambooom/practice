// https://leetcode.com/problems/delete-columns-to-make-sorted

function minDeletionSize(strs: string[]): number {
  let remove = 0;
  for (let i = 0; i < strs[0].length; i++) {
    let s = '';
    for (let j = 0; j < strs.length; j++) {
      s += strs[j][i];
    }
    if (s !== s.split('').sort().join('')) {
      remove++;
    }
  }
  return remove;
}
