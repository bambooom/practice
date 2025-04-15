// https://leetcode.com/problems/count-good-triplets-in-an-array/
// You are given two 0-indexed arrays nums1 and nums2 of length n, both of which are permutations of [0, 1, ..., n - 1].
// A good triplet is a set of 3 distinct values which are present in increasing order by position both in nums1 and nums2. In other words, if we consider pos1v as the index of the value v in nums1 and pos2v as the index of the value v in nums2, then a good triplet will be a set (x, y, z) where 0 <= x, y, z <= n - 1, such that pos1x < pos1y < pos1z and pos2x < pos2y < pos2z.
// Return the total number of good triplets.

// Example 1:
// Input: nums1 = [2,0,1,3], nums2 = [0,1,2,3]
// Output: 1
// Explanation:
// There are 4 triplets (x,y,z) such that pos1x < pos1y < pos1z. They are (2,0,1), (2,0,3), (2,1,3), and (0,1,3).
// Out of those triplets, only the triplet (0,1,3) satisfies pos2x < pos2y < pos2z. Hence, there is only 1 good triplet.

// Example 2:
// Input: nums1 = [4,0,1,3,2], nums2 = [4,1,0,2,3]
// Output: 4
// Explanation: The 4 good triplets are (4,0,3), (4,0,2), (4,1,3), and (4,1,2).

// indexMapping
// indexMapping[i]=pos2nums1[i], and indexMapping is also a permutation of 0 to n−1.
// When calculating the number of triplets i,j,k that meet the conditions, we can first fix j, then count how many numbers are less than indexMapping[j] in the indexMapping array to the left of index j, and denote it as left. Next, count how many numbers are greater than indexMapping[j] to the right of index j, and denote it as right. Thus, left×right represents the number of triplets with the middle element as j. By traversing all j, the answer can be calculated.
// Bingary Indexed Tree

// solution written as FenwickTree
class BinaryIndexedTree {
  private tree: number[];

  constructor(size: number) {
    this.tree = new Array(size + 1).fill(0);
  }

  // updates the value at a given index by adding a delta (a change in value)
  update(index: number, delta: number): void {
    index++; // BIT is typically 1-indexed?
    while (index < this.tree.length) {
      this.tree[index] += delta;
      index += index & -index;
      // bitwise operation that calculates the next index to update in the tree.
      // index & -index performs a bitwise AND operation between index and its two's complement (-index). This effectively gives us the least significant bit (LSB) of index.
      // Adding the LSB to index effectively moves us to the next index that needs to be updated in the tree.
    }
  }

  query(index: number): number {
    index++;
    let res = 0;
    while (index > 0) {
      res += this.tree[index];
      index -= index & -index;
    }
    return res;
  }
}

function goodTriplets(nums1: number[], nums2: number[]): number {
  const n = nums1.length;
  const pos2 = new Array(n).fill(0);
  const reversedIndexMapping = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    pos2[nums2[i]] = i;
    // store the index of each value in nums2
  }
  for (let i = 0; i < n; i++) {
    reversedIndexMapping[pos2[nums1[i]]] = i;
    // store the index of each value in nums1 after it has been mapped through pos2.
  }

  const bit = new BinaryIndexedTree(n);
  let res = 0;

  for (let value = 0; value < n; value++) {
    const pos = reversedIndexMapping[value]; // index of value in nums1, transformed through the reversedIndexMapping
    const left = bit.query(pos); // number of values in the BIT that are less than pos
    bit.update(pos, 1); // update to include pos
    const right = n - 1 - pos - (value - left); // number of values in the BIT that are greater than pos
    res += left * right; // total number of triplets with value as the middle element
  }

  return res;
}

// https://leetcode.com/problems/count-good-triplets-in-an-array/solutions/6651731/2179-count-good-triplets-in-an-array/?envType=daily-question&envId=2025-04-15
function goodTriplets2(nums1: number[], nums2: number[]): number {
  const n = nums1.length;

  const posInNums2 = new Array(n);
  for (let i = 0; i < n; i++) {
    posInNums2[nums2[i]] = i;
  }

  const transformed = nums1.map((v) => posInNums2[v]);

  class BIT {
    tree = new Array(n + 2).fill(0);
    update(i: number, delta: number) {
      i++;
      while (i < this.tree.length) {
        this.tree[i] += delta;
        i += i & -i;
      }
    }
    query(i: number): number {
      i++;
      let res = 0;
      while (i > 0) {
        res += this.tree[i];
        i -= i & -i;
      }
      return res;
    }
  }

  const leftTree = new BIT();
  const left = new Array(n);
  for (let i = 0; i < n; i++) {
    left[i] = leftTree.query(transformed[i] - 1);
    leftTree.update(transformed[i], 1);
  }

  const rightTree = new BIT();
  const right = new Array(n);
  for (let i = n - 1; i >= 0; i--) {
    right[i] = rightTree.query(n - 1) - rightTree.query(transformed[i]);
    rightTree.update(transformed[i], 1);
  }

  let result = 0;
  for (let i = 0; i < n; i++) {
    result += left[i] * right[i];
  }
  return result;
}
