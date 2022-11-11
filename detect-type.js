/**
 * @param {any} data
 * @return {string}
 */
function detectType(data) {
  if (data === null) return 'null';
  if (data === undefined) return undefined;
  return typeof data === 'object'
    ? data.constructor.name.toLowerCase()
    : typeof data;
}

console.log(detectType(1)); // 'number'
console.log(detectType(new Map())); // 'map'
console.log(detectType([])); // 'array'
console.log(detectType(null)); // 'null'
console.log(detectType(new Date())); // 'date'
console.log(detectType(new Set())); // 'set'
console.log(detectType(true)); // 'boolean'
console.log(detectType(new Boolean(true))); // 'boolean'? should be 'object'?
console.log(detectType({ a: 1 })); // object
