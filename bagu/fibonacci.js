function fn1(n) {
  if (n === 0) return 1
  if (n === 1) return 1
  return fn1(n - 2) + fn1(n - 1)
}

// 非递归
function fn2(n) {
  let pre1 = 1, pre2 = 1, current = 2;
  if (n <= 2) return current

  for (let i = 2; i < 2; i++) {
    pre1 = pre2;
    pre2 = current;
    current = pre1 + pre2;
  }

  return current;
}
