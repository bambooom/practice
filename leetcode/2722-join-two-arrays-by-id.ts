// https://leetcode.com/problems/join-two-arrays-by-id

// two pointer: time O(nlogn), space O(n)
function join(arr1: any[], arr2: any[]): any[] {
  arr1.sort((a, b) => a.id - b.id);
  arr2.sort((a, b) => a.id - b.id);

  let i = 0,
    j = 0;
  const res: any[] = [];
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i].id < arr2[j].id) {
      res.push(arr1[i]);
      i++;
    } else if (arr1[i].id > arr2[j].id) {
      res.push(arr2[j]);
      j++;
    } else {
      res.push({ ...arr1[i], ...arr2[j] });
      i++;
      j++;
    }
  }

  while (i < arr1.length) {
    res.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    res.push(arr2[j]);
    j++;
  }

  return res;
}

// using map: time O(nlogn), space O(n)
function join2(arr1: any[], arr2: any[]): any[] {
  const map = new Map<number, any>();

  for (const obj of arr1) {
    map.set(obj.id, obj);
  }

  for (const obj of arr2) {
    if (!map.has(obj.id)) {
      map.set(obj.id, obj);
    } else {
      const prevObj = map.get(obj.id);
      for (const key of Object.keys(obj)) {
        prevObj[key] = obj[key];
      }
    }
  }

  const res: any[] = [];
  for (const key of map.keys()) {
    res.push(map.get(key));
  }

  return res.sort((a, b) => a.id - b.id);
}
