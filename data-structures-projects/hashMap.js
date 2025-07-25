const murmur3 = require("murmurhash3js");

class Node {
  constructor(key = null, value = null) {
    this.key = key;
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

  append(key, value) {
    const newNode = new Node(key, value);

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
        return {
          key: current.key,
          value: current.value,
        };
      }
      current = current.nextNode;
    }

    return null;
  }

  updateNode(key, value) {
    let current = this.head;
    while (current) {
      if (current.key === key) {
        current.value = value;
        return true;
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
      rv += " ( " + current.value + " ) -> ";
      current = current.nextNode;
    }

    rv += "null";
    return rv;
  }
}

class HashMap {
  constructor(capacity = 16, loadFactor = 0.7) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = Array(this.capacity).fill(null);
  }

  loadFactorExceeded() {
    const threshold = this.capacity * this.loadFactor;
    return this.length() >= threshold;
  }

  tooSparse() {
    if (this.capacity <= 16) return false;
    const sparseLimit = Math.floor(this.capacity / 2) * this.loadFactor;
    return this.length() < sparseLimit;
  }

  growHashMap() {
    this.capacity *= 2;

    const oldBuckets = this.buckets;
    this.buckets = Array(this.capacity).fill(null);

    oldBuckets.forEach((linkedList) => {
      for (
        let current = linkedList.head;
        current !== null;
        current = current.nextNode
      ) {
        this.set(current.key, current.value);
      }
    });

    console.log(`Hash Map grown to size: `, this.capacity);
    return;
  }

  shrinkHashMap() {
    this.capacity = Math.floor(this.capacity / 2);

    const oldBuckets = this.buckets;
    this.buckets = Array(this.capacity).fill(null);

    oldBuckets.forEach((linkedList) => {
      for (
        let current = linkedList.head;
        current !== null;
        current = current.nextNode
      ) {
        this.set(current.key, current.value);
      }
    });

    console.log(`Hash Map shrunk to size: `, this.capacity);
    return;
  }

  hash(key) {
    return murmur3.x86.hash32(key);
  }

  set(key, value) {
    if (this.has(key)) {
      const index = this.hash(key) % this.capacity;
      const list = this.buckets[index];

      if (!list) this.buckets[index] = new LinkedList();
      this.buckets[index].append(key, value);

      if (this.loadFactorExceeded()) this.growHashMap();
    }
  }

  get(key) {
    if (!this.has(key)) return null;

    const index = this.hash(key) % this.capacity;
    const list = this.buckets[index];
    const kvPair = list.find(key);

    return kvPair.value;
  }

  has(key) {
    const index = this.hash(key) % this.capacity;

    if (!this.buckets[index]) return false;

    const list = this.buckets[index];
    const obj = list.find(key);

    if (!obj) return false;
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
    if (this.tooSparse) this.shrinkHashMap();
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

  values() {
    const keysBuckets = this.buckets.filter((element) => element !== null);
    const valueArr = [];

    keysBuckets.forEach((linkedList) => {
      for (
        let current = linkedList.head;
        current !== null;
        current = current.nextNode
      ) {
        valueArr.push(current.value);
      }
    });

    return valueArr;
  }

  entries() {
    const keysBuckets = this.buckets.filter((element) => element !== null);
    const entryArr = [];

    keysBuckets.forEach((linkedList) => {
      for (
        let current = linkedList.head;
        current !== null;
        current = current.nextNode
      ) {
        entryArr.push([current.key, current.value]);
      }
    });

    return entryArr;
  }
}
