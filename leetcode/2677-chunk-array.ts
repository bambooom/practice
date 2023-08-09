// https://leetcode.com/problems/chunk-array/

// Input: arr = [1,9,6,3,2], size = 3
// Output: [[1,9,6],[3,2]]

function chunk(arr: any[], size: number): any[][] {
  const res: any[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
}

// using reduce
function chunk2(arr: any[], size: number): any[][] {
  return arr.reduce((chunkedArray: any[][], element: any) => {
    const lastChunk = chunkedArray[chunkedArray.length - 1];
    if (!lastChunk || lastChunk.length === size) {
      chunkedArray.push([element]);
    } else {
      lastChunk.push(element);
    }
    return chunkedArray;
  }, []);
}
