// https://leetcode.com/problems/compact-object/
// Given an object or array obj, return a compact object.
// A compact object is the same as the original object, except with keys containing falsy values removed.
// This operation applies to the object and any nested objects.
// Arrays are considered objects where the indices are keys.
// A value is considered falsy when Boolean(value) returns false.

// Input: obj = [null, 0, false, 1]
// Output: [1]
// Input: obj = {"a": null, "b": [false, 1]}
// Output: { "b": [1] }
// Input: obj = [null, 0, 5, [0], [false, 16]]
// Output: [5, [], [16]]

type Obj = Record<any, any>;

function compactObject(obj: Obj): Obj {
  if (Array.isArray(obj)) {
    const res: any[] = [];
    obj.forEach((e) => {
      if (e) {
        res.push(typeof e === 'object' ? compactObject(e) : e);
      }
    });
    return res;
  }

  const res: Obj = {};
  for (const key in obj) {
    if (obj[key]) {
      res[key] =
        typeof obj[key] === 'object' ? compactObject(obj[key]) : obj[key];
    }
  }
  return res;
}

// Approach 1: Recursive Depth-First Search (DFS), time O(N), space O(D) (depth of the object)
function compactObject1(obj: Obj): Obj {
  function dfs(obj: any): any {
    if (!obj) return false;
    if (typeof obj !== 'object') return obj;

    if (Array.isArray(obj)) {
      const newArr: any[] = [];
      for (let i = 0; i < obj.length; i++) {
        const curr = obj[i];
        const subRes = dfs(curr);

        if (subRes) {
          newArr.push(subRes);
        }
      }

      return newArr;
    }

    const newObj: Obj = {};

    for (const key in obj) {
      const subRes = dfs(obj[key]);
      if (subRes) {
        newObj[key] = subRes;
      }
    }

    return newObj;
  }

  return dfs(obj);
}

// Approach 2: Iterative Depth-First Search, using stack
function compactObject2(obj: Obj): Obj {
  const stack: [Obj, Obj][] = [[obj, Array.isArray(obj) ? [] : {}]];
  const newObj: Obj = stack[0][1];

  while (stack.length > 0) {
    const [currObj, newCurrObj] = stack.pop()!;

    for (const key in currObj) {
      const val = currObj[key];

      if (!val) continue;

      if (typeof val !== 'object') {
        Array.isArray(newCurrObj)
          ? newCurrObj.push(val)
          : (newCurrObj[key] = val);
        continue;
      }

      const newSubObj: Obj = Array.isArray(val) ? [] : {};
      Array.isArray(newCurrObj)
        ? newCurrObj.push(newSubObj)
        : (newCurrObj[key] = newSubObj);
      stack.push([val, newSubObj]);
    }
  }

  return newObj;
}
