// https://leetcode.com/problems/convert-object-to-json-string/description/

function jsonStringify(object: any): string {
  if (object === null) {
    return 'null';
  }
  if (Array.isArray(object)) {
    return '[' + object.map(jsonStringify).join(',') + ']';
  }
  if (typeof object === 'object') {
    return (
      '{' +
      Object.keys(object)
        .map((k: string) => `"${k}":${jsonStringify(object[k])}`)
        .join(',') +
      '}'
    );
  }
  if (typeof object === 'string') {
    return `"${object}"`;
  }

  return String(object);
}
