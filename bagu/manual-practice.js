// 手写 Object.create

// 手写 instanceof 方法

// 手写 new 操作符?

// 手写 promise， promise.then, all, race

// 手写 debounce

// 手写 throttle

// 手写 call，apply，bind

// 手写 curry(fn)

// 手写 curry(fn, ...args)

// 手写 ajax & promise ajax

// 手写 shallow copy

// 手写 deep copy

// 数组 shuffle

// 数组求和，not 1 level

// 数组扁平化

// 数组去重

// 将数字每千分位用逗号隔开
function formatNumber(num) {
  const s = num.toString();
  const [int, decimal] = s.split('.');
  const len = int.length;
  if (len <= 3) {
    return s;
  }
  const first = len % 3;
  return (
    (first > 0 ? int.slice(0, first) + ',' : '') +
    int.slice(first).match(/\d{3}/g).join(',') +
    (decimal ? '.' + decimal : '')
  );
}

// console.log(formatNumber(1234567.89)); // 1,234,567.89
// console.log(formatNumber(123456.89)); // 123,456.89
// console.log(formatNumber(123456)); // 123,456
// console.log(formatNumber(12345678)); // 12,345,678

// 将js对象转化为树形结构
// https://juejin.cn/post/6983904373508145189
function convertJSONArrayToTree(arr) {
  if (!Array.isArray(arr)) {
    return [];
  }
  const res = [];
  const itemMap = {};
  arr.forEach((item) => {
    itemMap[item.id] = item;
  });
  arr.forEach((item) => {
    if (item.pid && itemMap[item.pid]) {
      if (!itemMap[item.pid].children) {
        itemMap[item.pid].children = [];
      }
      itemMap[item.pid].children.push(item);
    } else {
      res.push(item);
    }
  });
  return res;
}

// let arr = [
//     {id: 1, name: '部门1', pid: 0},
//     {id: 2, name: '部门2', pid: 1},
//     {id: 3, name: '部门3', pid: 1},
//     {id: 4, name: '部门4', pid: 3},
//     {id: 5, name: '部门5', pid: 4},
// ]

// console.log(convertJSONArrayToTree(arr))
