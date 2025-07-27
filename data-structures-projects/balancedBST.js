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
  }

  #buildTreeRecursive(array, left = 0, right = array.length - 1) {
    const mid = Math.floor((left + right) / 2);
    if (mid < left) {
      return null;
    }
    const root = new Node(array[mid]);

    root.leftChild = this.#buildTreeRecursive(array, left, mid - 1);
    root.rightChild = this.#buildTreeRecursive(array, mid + 1, right);

    return root;
  }

  buildTree(array) {
    const arrWithoutDuplicates = [...new Set(array)];
    arrWithoutDuplicates.sort((x, y) => x - y);
    return this.#buildTreeRecursive(arrWithoutDuplicates);
  }

  #insertRecursive(value, node = this.root) {
    if (node === null) return new Node(value);
    if (value === node.data) return node;

    if (value < node.data)
      node.leftChild = this.#insertRecursive(value, node.leftChild);
    if (value > node.data)
      node.rightChild = this.#insertRecursive(value, node.rightChild);
    return node;
  }

  insert(value) {
    this.root = this.#insertRecursive(value, this.root);
    return 0;
  }

  #getInorderSuccessor(node) {
    let successor = node.rightChild;
    while (successor.leftChild) {
      successor = successor.leftChild;
    }

    return successor;
  }

  #deleteItemRecursive(value, node = this.root) {
    if (node === null) return node;

    if (value < node.data)
      node.leftChild = this.#deleteItemRecursive(value, node.leftChild);
    else if (value > node.data)
      node.rightChild = this.#deleteItemRecursive(value, node.rightChild);
    else {
      // no children
      if (node.rightChild === null && node.leftChild === null) return null;
      // only 1 children
      if (node.rightChild === null) return node.leftChild;
      else if (node.leftChild === null) return node.rightChild;
      // if both children
      else {
        const inorderSuccessor = this.#getInorderSuccessor(node);

        const temp = node.data;
        node.data = inorderSuccessor.data;
        inorderSuccessor.data = temp;

        node.rightChild = this.#deleteItemRecursive(value, node.rightChild);
      }
    }

    return node;
  }

  deleteItem(value) {
    this.root = this.#deleteItemRecursive(value, this.root);
    return 0;
  }

  find(value, node = this.root) {
    if (node === null) return node;
    if (node.data === value) return node;
    if (value < node.data) return this.find(value, node.leftChild);
    return this.find(value, node.rightChild);
  }

  // iterative
  levelOrderForEach(callback) {
    try {
      if (!callback) {
        throw new Error("No callback provided.");
      }

      const queue = [];
      queue.push(this.root);

      while (queue.length > 0) {
        const node = queue.shift();
        callback(node);
        if (node.leftChild) queue.push(node.leftChild);
        if (node.rightChild) queue.push(node.rightChild);
      }
    } catch (err) {
      console.log(err);
      return null;
    }

    return 0;
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

test.insert(69);
test.insert(7);
test.insert(123);
test.insert(6);
prettyPrint(test.root);

test.deleteItem(6345);
test.deleteItem(7);
test.deleteItem(69);
test.deleteItem(8);
prettyPrint(test.root);

console.log(test.find(9));
console.log(test.find(5));
console.log(test.find(324));
console.log(test.find(-1));

test.levelOrderForEach((node) => {
  console.log(node.data);
});
