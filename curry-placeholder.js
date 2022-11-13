// 没太懂这题

function curry(fn) {
  return function curried(...args) {
    // if number of arguments match
    if (isArgsMet(args, fn, curry.placeholder)) {
      return fn.call(this, ...args);
    }

    // otherwise return a function which merges the args
    return function (...nextArgs) {
      const mergedArgs = mergeArgs(args, nextArgs, curry.placeholder);
      return curried.call(this, ...mergedArgs);
    };
  };
}
curry.placeholder = Symbol();

function mergeArgs(argsTo, argsFrom, placeholder) {
  const mappedArgsTo = argsTo.map((item) =>
    item === placeholder && argsFrom.length ? argsFrom.shift() : item
  );
  return [...mappedArgsTo, ...argsFrom];
}

function isArgsMet(args, fn, placeholder) {
  if (args.length < fn.length) {
    return false;
  }

  return args.slice(0, fn.length).every((item) => item !== placeholder);
}

const  join = (a, b, c) => {
  return `${a}_${b}_${c}`
}

const curriedJoin = curry(join)
const _ = curry.placeholder

console.log(curriedJoin(1, 2, 3)) // '1_2_3'

console.log(curriedJoin(_, 2)(1, 3)) // '1_2_3'

console.log(curriedJoin(_, _, _)(1)(_, 3)(2)) // '1_2_3'
