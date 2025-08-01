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

      return 0;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  // recursive
  // levelOrderForEach(callback, queue = null) {
  //   try {
  //     if (!callback) throw new Error("No callback provided.");

  //     if (!queue) {
  //       queue = [];
  //       this.root.level = 0;
  //       queue.push(this.root);
  //     }

  //     if (queue.length === 0) return 0;

  //     const node = queue.shift();
  //     callback(node);

  //     if (node.leftChild) {
  //       node.leftChild.level = node.level + 1;
  //       queue.push(node.leftChild);
  //     }
  //     if (node.rightChild) {
  //       node.rightChild.level = node.level + 1;
  //       queue.push(node.rightChild);
  //     }

  //     return this.levelOrderForEach(callback, queue);
  //   } catch (err) {
  //     console.log(err);
  //     return null;
  //   }
  // }

  inOrderForEach(callback, node = this.root) {
    if (!node) return null;

    try {
      if (!callback) throw new Error("No callback provided");

      this.inOrderForEach(callback, node.leftChild);
      callback(node);
      this.inOrderForEach(callback, node.rightChild);
    } catch (err) {
      console.log(err);
    }

    return 0;
  }

  preOrderForEach(callback, node = this.root) {
    if (!node) return null;

    try {
      if (!callback) throw new Error("No callback provided");

      callback(node);
      this.preOrderForEach(callback, node.leftChild);
      this.preOrderForEach(callback, node.rightChild);
    } catch (err) {
      console.log(err);
    }

    return 0;
  }

  postOrderForEach(callback, node = this.root) {
    if (!node) return null;

    try {
      if (!callback) throw new Error("No callback provided");

      this.postOrderForEach(callback, node.leftChild);
      this.postOrderForEach(callback, node.rightChild);
      callback(node);
    } catch (err) {
      console.log(err);
    }

    return 0;
  }

  #heightRecursive(node) {
    if (node === null) return -1;

    return (
      1 +
      Math.max(
        this.#heightRecursive(node.leftChild),
        this.#heightRecursive(node.rightChild)
      )
    );
  }

  height(value) {
    const node = this.find(value);

    if (node === null) return null;
    return this.#heightRecursive(node);
  }

  depth(value, node = this.root, currDepth = 0) {
    if (node === null) return null;

    if (node.data === value) return currDepth;

    if (value < node.data)
      return this.depth(value, node.leftChild, currDepth + 1);

    return this.depth(value, node.rightChild, currDepth + 1);
  }

  #isBalancedRecursive(node = this.root) {
    if (node === null) return { balanced: true, height: -1 };
    const [leftSubtree, rightSubtree] = [
      this.#isBalancedRecursive(node.leftChild),
      this.#isBalancedRecursive(node.rightChild),
    ];

    return {
      balanced:
        leftSubtree.balanced &&
        rightSubtree.balanced &&
        Math.abs(leftSubtree.height - rightSubtree.height) <= 1,
      height: 1 + Math.max(leftSubtree.height, rightSubtree.height),
    };
  }

  isBalanced() {
    return this.#isBalancedRecursive().balanced;
  }

  rebalance() {
    const sortedArr = [];
    this.inOrderForEach((node) => {
      sortedArr.push(node.data);
    });
    this.root = this.buildTree(sortedArr);

    // beautiful isn't it :)
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

const arrayCreator = () => {
  const arr = [];
  for (let i = 0; i < 100; i++) arr.push(Math.floor(100 * Math.random()));
  return arr;
};

const arr = arrayCreator();

const bst = new Tree(arr);
prettyPrint(bst.root);
console.log(`Balanced? : ${bst.isBalanced()}`);

console.log(`Inorder Traversal:`);
bst.inOrderForEach((node) => {
  console.log(node.data);
});

console.log(`Preorder Traversal:`);
bst.preOrderForEach((node) => {
  console.log(node.data);
});

console.log(`Postorder Traversal:`);
bst.postOrderForEach((node) => {
  console.log(node.data);
});

for (let i = 100; i < 150; i++) {
  bst.insert(i);
}

prettyPrint(bst.root);
console.log(`Balanced? : ${bst.isBalanced()}`);

bst.rebalance();

prettyPrint(bst.root);
console.log(`Balanced? : ${bst.isBalanced()}`);

console.log(`Level order Traversal:`);
bst.levelOrderForEach((node) => {
  console.log(node.data);
});
