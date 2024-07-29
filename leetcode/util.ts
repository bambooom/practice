/**
 * Definition for a binary tree node.
 */

export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

/**
 * Definition of linked list node
 */
export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

/**
 * Definition of a perfect binary tree node
 */
export class Node {
  val: number;
  left: Node | null;
  right: Node | null;
  next: Node | null;
  constructor(val?: number, left?: Node, right?: Node, next?: Node) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
    this.next = next === undefined ? null : next;
  }
}

/**
 * node of an n-ary tree
 */
export class NNode {
  val: number;
  children: NNode[];
  constructor(val?: number, children?: NNode[]) {
    this.val = val === undefined ? 0 : val;
    this.children = children === undefined ? [] : children;
  }
}

// Not really implement it, just for test
export class ImmutableListNode {
  printValue() {
    console.log('log the value');
  }
  getNext(): ImmutableListNode {
    return new ImmutableListNode();
  }
}

/**
 * Definition for _Node.
 */
export class _Node {
  val: number;
  children: _Node[];

  constructor(v: number, c: _Node[] = []) {
    this.val = v;
    this.children = c;
  }
}
