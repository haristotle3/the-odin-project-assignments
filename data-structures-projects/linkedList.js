class Node {
  constructor(value = null) {
    this.value = value;
    this.nextNode = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.numNodes = 0;
  }

  append(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
    }

    if (!this.tail) {
      this.tail = newNode;
    } else {
      this.tail.nextNode = newNode;
      this.tail = newNode;
    }

    this.numNodes++;
  }

  prepend(value) {
    const newNode = new Node(value);

    if (!this.tail) {
      this.tail = newNode;
    }

    if (!this.head) {
      this.head = newNode;
    } else {
      newNode.nextNode = this.head;
      this.head = newNode;
    }

    this.numNodes++;
  }

  insertAt(value, index) {
    if (index <= 0) {
      this.prepend(value);
      return;
    } else if (index >= this.size()) {
      this.append(value);
      return;
    } else {
      const newNode = new Node(value);

      let currentIndex = 1;
      let currentNode = this.head;

      while (currentIndex < index) {
        currentNode = currentNode.nextNode;
        currentIndex++;
      }

      newNode.nextNode = currentNode.nextNode;
      currentNode.nextNode = newNode;
      this.numNodes++;
      return;
    }
  }

  size() {
    return this.numNodes;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
  }

  at(index = 0) {
    let current = this.head;

    for (let i = 0; i < index; i++) {
      current = current.nextNode;
    }

    return current;
  }

  pop() {
    let current = this.head;
    if (!current) {
      return null;
    }

    if (!current.nextNode) {
      this.head = null;
      this.tail = null;
      return current.value;
    }

    while (current.nextNode !== this.tail) {
      current = current.nextNode;
    }

    const rv = this.tail.value;
    current.nextNode = null;
    this.tail = current;
    this.numNodes--;
    return rv;
  }

  removeAt(index) {
    if (index >= this.size() || index < 0) {
      return null;
    } else if (index === this.size() - 1) {
      return this.pop();
    } else {
      let rv;
      if (index === 0) {
        rv = this.head.value;
        this.head = this.head.nextNode;
      } else {
        let current = this.head;
        let currentIndex = 1;

        while (currentIndex < index) {
          current = current.nextNode;
          currentIndex++;
        }

        rv = current.nextNode.value;
        current.nextNode = current.nextNode.nextNode;
      }
      this.numNodes--;
      return rv;
    }
  }

  contains(value) {
    let current = this.head;

    while (current) {
      if (current.value === value) return true;
      current = current.nextNode;
    }

    return false;
  }

  find(value) {
    let current = this.head;
    let currentIndex = 0;

    while (current) {
      if (current.value === value) return currentIndex;
      current = current.nextNode;
      currentIndex++;
    }

    return null;
  }

  toString() {
    if (!this.head) return "null";

    let current = this.head;
    let rv = ``;
    while (current) {
      rv += " ( " + current.value + " ) -> ";
      current = current.nextNode;
    }

    rv += "null";
    return rv;
  }
}

const list = new LinkedList();

list.prepend("hamster");
list.prepend("snake");
list.prepend("turtle");
console.log(list.toString());
console.log("Size", list.size());

list.append("dog");
list.append("cat");
list.append("parrot");
console.log(list.toString());
console.log("Size", list.size());

list.insertAt("dinosaur", -2);
list.insertAt("kangaroo", 99);
list.insertAt("dodo", 5);
list.insertAt("penguin", 3);
console.log(list.toString());
console.log("Size", list.size());

console.log("Deleted", list.removeAt(0));
console.log("Deleted", list.removeAt(8));
console.log("Deleted", list.removeAt(3));
console.log(list.toString());
console.log("Size", list.size());

console.log("Deleted:", list.pop());
console.log("Deleted:", list.pop());
console.log(list.toString());

console.log("Snake exists:", list.contains("snake"));
console.log("Hamster exists:", list.contains("hamster"));
console.log("Snake index:", list.find("snake"));
console.log("Hamster index:", list.find("hamster"));
