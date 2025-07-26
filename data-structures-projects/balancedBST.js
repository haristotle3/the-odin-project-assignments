class Node {
  constructor(data = null) {
    this.data = data;
    this.leftChild = null;
    this.rightChild = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
    console.log(this.root.data);
    prettyPrint(this.root);
  }

  buildTree(array) {
    console.log("Input: ", array);
    const arrWithoutDuplicates = [...new Set(array)];
    arrWithoutDuplicates.sort((x, y) => x - y);
    console.log("Sorted without duplicates: ", arrWithoutDuplicates);
    return this.buildTreeRecursive(arrWithoutDuplicates);
  }

  buildTreeRecursive(array, left = 0, right = array.length - 1) {
    const mid = Math.floor((left + right) / 2);
    if (mid < left) {
      return null;
    }
    const root = new Node(array[mid]);

    root.leftChild = this.buildTreeRecursive(array, left, mid - 1);
    root.rightChild = this.buildTreeRecursive(array, mid + 1, right);

    return root;
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.rightChild !== null) {
    prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.leftChild !== null) {
    prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const test = new Tree(arr);
