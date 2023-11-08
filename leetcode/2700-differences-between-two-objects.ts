// https://leetcode.com/problems/differences-between-two-objects
// Write a function that accepts two deeply nested objects or arrays obj1 and obj2 and returns a new object representing their differences.
// The function should compare the properties of the two objects and identify any changes. The returned object should only contains keys where the value is different from obj1 to obj2. For each changed key, the value should be represented as an array [obj1 value, obj2 value]. Keys that exist in one object but not in the other should not be included in the returned object. When comparing two arrays, the indices of the arrays are considered to be their keys. The end result should be a deeply nested object where each leaf value is a difference array.
// You may assume that both objects are the output of JSON.parse.

type JSONValue =
  | null
  | boolean
  | number
  | string
  | JSONValue[]
  | { [key: string]: JSONValue };
type Obj2 = Record<string, JSONValue> | Array<JSONValue>;

const T = (o: any): string =>
  Array.isArray(o) ? 'array' : o === null ? 'null' : typeof o;

function objDiff(obj1: Obj2, obj2: Obj2): Obj2 {
  const diff: Obj2 = {};
  Object.keys(obj1).forEach((k) => {
    // eslint-disable-next-line no-prototype-builtins
    if (!obj2.hasOwnProperty(k)) {
      return;
    }

    const w = obj1[k],
      x = obj2[k],
      t1 = T(w),
      t2 = T(x);
    if (t1 !== t2) {
      diff[k] = [w, x];
    } else if (t1 === 'array' || t1 === 'object') {
      const c = objDiff(w, x);
      if (Object.keys(c).length > 0) {
        diff[k] = c;
      }
    } else if (w !== x) {
      diff[k] = [w, x];
    }
  });

  return diff;
}
