function letterCasePermutation(S: string): string[] {
  const n = S.length;
  const res: string[] = [];
  const char = /[a-zA-Z]/;
  const arr: string[] = [];

  function backtrack(i: number) {
    if (i == n) {
      res.push(arr.join(''));
      return;
    }

    if (char.test(S[i])) {
      arr[i] = S[i].toLowerCase();
      backtrack(i + 1);
      arr[i] = S[i].toUpperCase();
      backtrack(i + 1);
    } else {
      arr[i] = S[i];
      backtrack(i + 1);
    }
  }

  backtrack(0);
  return res;
}

console.log(letterCasePermutation('a1b2')); // ["a1b2","a1B2","A1b2","A1B2"]
