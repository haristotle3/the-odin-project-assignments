const murmur3 = require("murmurhash3js");

class Node {
  constructor(key = null, value = null) {
    this.key = key;
    this.nextNode = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.numNodes = 0;
  }

  append(key) {
    const newNode = new Node(key);

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

  size() {
    return this.numNodes;
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

  removeNode(key) {
    return this.removeAt(this.indexOf(key));
  }

  indexOf(key) {
    let current = this.head;
    let currentIndex = 0;

    while (current) {
      if (current.key === key) {
        return currentIndex;
      }
      current = current.nextNode;
      currentIndex++;
    }

    return null;
  }

  find(key) {
    let current = this.head;
    while (current) {
      if (current.key === key) {
        return current.key;
      }
      current = current.nextNode;
    }

    return null;
  }

  toString() {
    if (!this.head) return "null";

    let current = this.head;
    let rv = ``;
    while (current) {
      rv += " { " + current.key + " } -> ";
      current = current.nextNode;
    }

    rv += "null";
    return rv;
  }
}

class HashSet {
  constructor(capacity = 16, loadFactor = 0.8) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = Array(this.capacity).fill(null);
  }

  loadFactorExceeded() {
    const threshold = this.capacity * this.loadFactor;
    return this.length() > threshold;
  }

  tooSparse() {
    if (this.capacity <= 16) return false;
    const sparseLimit = Math.floor(this.capacity / 2) * this.loadFactor;
    return this.length() < sparseLimit;
  }

  growHashSet() {
    this.capacity *= 2;

    const oldBuckets = this.buckets.filter((element) => element !== null);
    this.buckets = Array(this.capacity).fill(null);

    oldBuckets.forEach((linkedList) => {
      for (
        let current = linkedList.head;
        current !== null;
        current = current.nextNode
      ) {
        this.set(current.key);
      }
    });

    console.log(`Hash Set grown to size: `, this.capacity);
    return;
  }

  shrinkHashSet() {
    this.capacity = Math.floor(this.capacity / 2);

    const oldBuckets = this.buckets.filter((element) => element !== null);
    this.buckets = Array(this.capacity).fill(null);

    oldBuckets.forEach((linkedList) => {
      for (
        let current = linkedList.head;
        current !== null;
        current = current.nextNode
      ) {
        this.set(current.key);
      }
    });

    console.log(`Hash Set shrunk to size: `, this.capacity);
    return;
  }

  hash(key) {
    return murmur3.x86.hash32(key);
  }

  set(key) {
    const index = this.hash(key) % this.capacity;
    const EXISTS_ALREADY = 200;
    const INSERT_RV = 400;

    if (this.has(key)) {
      return EXISTS_ALREADY;
    }

    if (!this.buckets[index]) {
      this.buckets[index] = new LinkedList();
    }

    this.buckets[index].append(key);
    if (this.loadFactorExceeded()) this.growHashSet();
    return INSERT_RV;
  }

  get(key) {
    if (!this.has(key)) return null;

    const index = this.hash(key) % this.capacity;
    const list = this.buckets[index];
    return list.find(key);
  }

  has(key) {
    const index = this.hash(key) % this.capacity;

    if (!this.buckets[index]) return false;

    const list = this.buckets[index];
    const rv = list.find(key);

    if (!rv) return false;
    return true;
  }

  remove(key) {
    if (!this.has(key)) return false;

    const index = this.hash(key) % this.capacity;
    const list = this.buckets[index];

    list.removeNode(key);
    if (list.size() === 0) {
      this.buckets[index] = null;
    }
    if (this.tooSparse()) this.shrinkHashSet();
    return true;
  }

  length() {
    const keysBuckets = this.buckets.filter((element) => element !== null);
    return keysBuckets.reduce(
      (accumulator, currentElement) => accumulator + currentElement.size(),
      0
    );
  }

  clear() {
    this.capacity = 16;
    this.buckets = Array(this.capacity).fill(null);
  }

  keys() {
    const keysBuckets = this.buckets.filter((element) => element !== null);
    const keysArr = [];

    keysBuckets.forEach((linkedList) => {
      for (
        let current = linkedList.head;
        current !== null;
        current = current.nextNode
      ) {
        keysArr.push(current.key);
      }
    });

    return keysArr;
  }

  display() {
    this.buckets.forEach((linkedList, index) => {
      if (!linkedList) {
        console.log(index, ":", linkedList);
      } else {
        console.log(index, ":", linkedList.toString());
      }
    });

    return;
  }
}

const test = new HashSet(16, 0.75);

test.set("apple");
test.set("banana");
test.set("carrot");
test.set("dog");
test.set("elephant");
test.set("frog");
test.set("grape");
test.set("hat");
test.set("ice cream");
test.set("jacket");
test.set("kite");
test.set("lion");
test.display();
console.log("Length:", test.length(), "LF: ", test.loadFactor * test.capacity);
test.set("kite");
test.set("ice cream");
test.set("frog");
test.display();
console.log("Length:", test.length(), "LF: ", test.loadFactor * test.capacity);
test.set("moon");
test.display();
console.log("Length:", test.length(), "LF: ", test.loadFactor * test.capacity);
test.set("moon");
test.display();
console.log("Length:", test.length(), "LF: ", test.loadFactor * test.capacity);
console.log(test.get("frog"));
console.log(test.get("donkey"));
console.log(test.has("frog"));
console.log(test.has("donkey"));
console.log(test.remove("frog"));
console.log(test.remove("moon"));
console.log(test.remove("donkey"));
console.log(test.remove("ice cream"));
console.log(test.keys());
test.display();
test.remove("apple");
test.remove("banana");
test.remove("carrot");
test.remove("dog");
test.remove("elephant");
test.remove("frog");
test.remove("grape");
test.remove("hat");
test.remove("ice cream");
test.remove("jacket");
test.remove("kite");
test.remove("lion");
test.remove("lion");
test.display();
