// eslint-disable-next-line @typescript-eslint/ban-types
function sortBy(arr: any[], fn: Function): any[] {
  return arr.sort((a, b) => fn(a) - fn(b));
}
