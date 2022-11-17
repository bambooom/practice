// https://github.com/kalpeshsingh/data-structure-agorithms-in-js/blob/master/23.md

function sum(a) {
  const fn = (b) => sum(a + b);
  fn[Symbol.toPrimitive] = () => a;
  return fn;
}

function sum_va(num) {
  const fn = (num2) => sum_va(num + num2);
  fn.valueOf = () => num;
  return fn;
}


// test-case, need to comparison is enough
// 当做比较的时候，是会使用 valueOf
// sum(1) == 1;
// sum(1)(2) == 3;
// sum(1)(2)(-3) == 0;
// sum1(1) == 2, sum1(2) == 3;
// 如果是直接 console.log(sum(1)) 会直接是 function，不会有值
