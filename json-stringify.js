/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
 * // as many cases as possoble
 *
 * bigint -> throw error
 * Infinity/-Infinity/null/defined/NaN -> null
 * symbol -> null
 *
 * string -> ""
 * number/boolean -> ''
 * function -> undefined
 * Date -> "toISOString"
 *
 * Array:
 *  - has empty [1,,,4] -> "[1,null,null,4]"
 *  - has key other than interger, key-value pair ignored:
 *      [1,2,3, key:value] -> "[1,2,3]"
 * Object: {key:value,..}
 */

function stringify(data) {
  if (typeof data === 'bigint') {
    if (data.toJSON) {
      data = data.toJSON();
    } else {
      throw Error('bigint cannot be handled');
    }
  }
  if (
    data === Infinity ||
    data === -Infinity ||
    data !== data ||
    data === null ||
    typeof data === 'undefined' ||
    typeof data === 'symbol'
  ) {
    return 'null';
  }
  if (typeof data === 'string') {
    return `"${data}"`;
  }
  if (typeof data === 'number' || typeof data === 'boolean') {
    return `${data}`;
  }
  if (typeof data === 'function') {
    return undefined;
  }
  if (data instanceof Date) {
    return `"${data.toISOString()}"`;
  }
  if (Array.isArray(data)) {
    const items = Object.entries(data);
    let str = [];
    for (let i = 0; i < items.length; i++) {
      if (Number.isNaN(Number(items[i][0]))) {
        continue;
      }
      if (i < Number(items[i][0])) {
        str = str.concat(new Array(Number(items[i][0]) - i).fill(null));
      }
      str.push(stringify(items[i][1]));
    }
    return '[' + str.join(',') + ']';
  }
  if (typeof data === 'object') {
    const res = Object.entries(data).reduce((acc, [key, value]) => {
      if (value === undefined) {
        return acc;
      }
      acc.push(`"${key}":${stringify(value)}`);
      return acc;
    }, []);
    return `{${res.join(',')}}`;
  }
}
