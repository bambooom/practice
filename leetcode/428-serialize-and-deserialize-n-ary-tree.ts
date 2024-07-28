// https://leetcode.com/problems/serialize-and-deserialize-n-ary-tree
// Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.
// Design an algorithm to serialize and deserialize an N-ary tree. An N-ary tree is a rooted tree in which each node has no more than N children. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that an N-ary tree can be serialized to a string and this string can be deserialized to the original tree structure.

// Example 1:
// Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
// Output: [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
// Example 2:
// Input: root = [1,null,3,2,4,null,5,6]
// Output: [1,null,3,2,4,null,5,6]
// Example 3:
// Input: root = []
// Output: []

/**
 * Definition for _Node.
 */
class _Node {
  val: number;
  children: _Node[];

  constructor(v: number, c: _Node[] = []) {
    this.val = v;
    this.children = c;
  }
}

// https://leetcode.com/problems/serialize-and-deserialize-n-ary-tree/solutions/516839/javascript-solution/?envType=study-plan-v2&envId=premium-algo-100
class Codec1 {
  serialize(root: _Node | null): string {
    return JSON.stringify(root);
  }

  deserialize(data: string): _Node | null {
    return JSON.parse(data);
  }
}
// or implement them yourself
class Codec2 {
  stringify(node: _Node | null): string {
    if (node === null) return '';
    return `{"val":${node.val},"children":[${
      node.children.length
        ? node.children.map((child) => this.stringify(child))
        : ``
    }]}`;
  }

  serialize(root: _Node | null): string {
    return this.stringify(root);
  }

  parse(data: string): _Node {
    let i = 0;

    while (data[i] !== ':') i++;

    const valStart = i + 1;

    while (data[i] !== ',') i++;

    const valString = data.substring(valStart, i);
    const val = parseInt(valString);

    while (data[i] !== '[') i++;

    const childrenStart = i + 1;
    const childrenEnd = data.length - 2;
    const children: _Node[] = [];

    let level = 0;
    let nodeStart;
    let nodeEnd;

    i = childrenStart;

    while (i < childrenEnd) {
      if (data[i] === '{') {
        if (nodeStart === undefined) nodeStart = i;
        level--;
      } else if (data[i] === '}') {
        nodeEnd = i + 1;
        level++;
      }

      if (level === 0 && nodeStart !== undefined) {
        const childString = data.substring(nodeStart, nodeEnd);
        const child = this.parse(childString);

        children.push(child);
        nodeStart = undefined;
      }

      i++;
    }

    return new _Node(val, children);
  }

  deserialize(data: string): _Node | null {
    if (data === '') return null;
    return this.parse(data);
  }
}

// https://leetcode.com/problems/serialize-and-deserialize-n-ary-tree/solutions/3375553/simple-javascript-preorder-traversal-with-queue/?envType=study-plan-v2&envId=premium-algo-100
// To serialize, we traverse the tree in preorder and store visited nodes in a queue. To deserialize, we simply reverse the process.
// Let t be the root of a tree. The serialized version is[t.val, t.children.length, ...serialize(t.children)]
// In the example from the problem statement, the serialized version is[1,3,3,2,5,0,6,0,2,0,4,0]
class Codec {
  constructor() {
    // empty
  }

  // Encodes a tree to a single string.
  serialize(root: _Node | null): string {
    const result = [];
    if (root) {
      result.push(root.val, root.children.length);

      const serializedChildren = root.children.map((c) => this.serialize(c));
      const flatten = serializedChildren.reduce(
        (arr, val) => [...arr, ...val],
        [],
      );
      result.push(...flatten);
    } else {
      result.push(null);
    }

    return result.join(',');
  }

  // Decodes your encoded data to tree.
  deserialize(data: string): _Node | null {
    const val = data.shift();
    if (val === null) return null;

    const node = new _Node(val);

    let numChildren = data.shift();
    const children = [];
    while (numChildren--) {
      children.push(this.deserialize(data));
    }

    node.children = children;
    return node;
  }
}

// Your Codec object will be instantiated and called as such:
// Codec codec = new Codec();
// codec.deserialize(codec.serialize(root));
