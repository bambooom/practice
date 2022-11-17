/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
 * @param {string} str
 * @return {object | Array | string | number | boolean | null}
 */
function parse(str) {
  if (str === '') {
    throw Error('empty');
  }
  if (str[0] === "'") {
    throw Error('not allow single quote');
  }
  if (str === 'null') {
    return null;
  }
  if (str === '{}') {
    return {};
  }
  if (str === '[]') {
    return [];
  }
  if (str === 'true') {
    return true;
  }
  if (str === 'false') {
    return false;
  }
  if (str[0] === '"') {
    return str.slice(1, -1);
  }
  if (+str === +str) {
    // number
    return Number(str);
  }
  if (str[0] === '{') {
    // object
    return str
      .slice(1, -1)
      .split(',')
      .reduce((acc, item) => {
        const index = item.indexOf(':');
        const key = item.slice(0, index);
        const value = item.slice(index + 1);
        acc[parse(key)] = parse(value);
        return acc;
      }, {});
  }
  if (str[0] === '[') {
    // array
    return str
      .slice(1, -1)
      .split(',')
      .map(value => parse(value));
  }
}
