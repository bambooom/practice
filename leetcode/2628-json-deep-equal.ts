// https://leetcode.com/problems/json-deep-equal

/*
function areDeeplyEqual(o1: any, o2: any): boolean {
  return JSON.stringify(o1) === JSON.stringify(o2);
}

the above using only JSON.stringify is wrong for object with keys order different:
o1 = {"y":2,"x":1}
o2 = {"x":1,"y":2}

JSON.stringify(o1) -> `{"x":1,"y":2}`
JSON.stringify(o2) -> `{"y":2,"x":1}`
*/

// Approach 1: Comparative Recursion:
function areDeeplyEqual(o1: any, o2: any): boolean {
  if (o1 === o2) return true;
  if (o1 === null || o2 === null) return false;
  if (String(o1) !== String(o2)) return false;

  if (typeof o1 !== 'object') {
    return o1 === o2;
  }

  if (Array.isArray(o1)) {
    if (o1.length !== o2.length) return false;

    for (let i = 0; i < o1.length; i++) {
      if (!areDeeplyEqual(o1[i], o2[i])) return false;
    }

    return true;
  }

  if (Object.keys(o1).length !== Object.keys(o2).length) return false;

  for (const key in o1) {
    if (!areDeeplyEqual(o1[key], o2[key])) return false;
  }

  return true;
}

// Approach 2: Iterative Solution:
function areDeeplyEqual2(o1: any, o2: any): boolean {
  const objs: [any, any][] = [[o1, o2]];

  while (objs.length) {
    [o1, o2] = objs.pop()!;

    if (o1 === o2) continue;
    if (typeof o1 !== 'object' || typeof o2 !== 'object') return false;
    if (Array.isArray(o1) !== Array.isArray(o2)) return false;

    const keys1 = Object.keys(o1);
    const keys2 = Object.keys(o2);

    if (keys1.length !== keys2.length) return false;
    for (const key of keys1) {
      if (!(key in o2)) return false;
      objs.push([o1[key], o2[key]]);
    }
  }

  return true;
}

// Approach 3: Using JSON.stringify and Sorting:
function helper(key: string, value: any): any {
  if (value && typeof value === 'object' && !Array.isArray(value))
    // sort plain objects by keys
    return Object.fromEntries(Object.entries(value).sort());
  else return value;
}

function areDeeplyEqual3(o1: any, o2: any): boolean {
  const stringifiedO1 = JSON.stringify(o1, helper);
  const stringifiedO2 = JSON.stringify(o2, helper);

  return stringifiedO1 === stringifiedO2;
}
