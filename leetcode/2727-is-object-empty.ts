// Given an object or an array, return if it is empty.
// An empty object contains no key-value pairs.
// An empty array contains no elements.

function isEmpty(obj: Record<string, any> | any[]): boolean {
  if (Array.isArray(obj)) {
    return obj.length === 0;
  } else {
    return Object.keys(obj).length === 0;
  }
}

// Approach 1: Using JSON.stringify, O(n), O(n)
function isEmpty1(obj: Record<string, any> | any[]): boolean {
  if (JSON.stringify(obj).length <= 2) {
    return true;
  } else {
    return false;
  }
}

// Approach 2: Using Object.keys, O(n), O(n)
function isEmpty2(obj: Record<string, any> | any[]): boolean {
  return Object.keys(obj).length === 0;
}

// *Approach 3: Using loop, O(1), O(1), innovative
// If the array/object is not empty, the interpreter will enter the for-in loop,
// and therefore the first return statement false will be run and if it is empty,
// the interpreter will not enter the for-in loop, and so the second return statement true will be executed.
function isEmpty3(obj: Record<string, any> | any[]): boolean {
  for (const _ in obj) {
    return false;
  }
  return true;
}
