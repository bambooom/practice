// https://leetcode.com/problems/function-composition/
// Function Transformations
// [f(x), g(x), h(x)] is fn(x) = f(g(h(x)))

type F = (x: number) => number;

function compose1(functions: F[]): F {
  return function (x) {
    if (functions.length === 0) return x;
    for (let i = functions.length - 1; i >= 0; i--) {
      x = functions[i](x);
    }
    return x;
  };
}

/**
 * const fn = compose1([x => x + 1, x => 2 * x])
 * fn(4) // 9
 */

// using reduceRight
function compose2(functions: F[]): F {
  return (x: number) => functions.reduceRight((acc, f) => f(acc), x);
}

// if using ramda
// import { compose } from 'ramda';
// const composedFn = compose(...functions);

// if using lodash
// import { flowRight } from 'lodash';
// const composedFn = flowRight(...functions);
