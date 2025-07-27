levelOrderForEach(callback, queue = null) {
  //   console.log("Recursive was called!");
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