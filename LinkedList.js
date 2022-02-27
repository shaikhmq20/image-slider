class Node {
  // constructor
  constructor(imgPath) {
    this.imgPath = imgPath;
    this.prev = null;
    this.next = null;
  }
}

export default class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
    this.last = null;
  }

  // Checks whether the LL is empty
  isEmpty() {
    return this.size === 0;
  }

  // Append a node to LL
  add(imgPath) {
    // creates a new node
    var node = new Node(imgPath);
    this.last = node;

    var current;

    if (this.head === null) {
      this.head = node;
      this.size++;
      return;
    } else {
      current = this.head;

      // iterate to the end of the list
      for (let i = 0; i < this.size - 1 && current != null; i++) {
        current = current.next;
      }
      node.prev = current;
      current.next = node;
      node.next = this.head;
      this.head.prev = node;
    }
    this.size++;
  }

  delete(element) {
    let current = this.head;

    if (this.size == 1) {
      return null;
    }

    if (element.imgPath === this.head.imgPath) {
      this.head = this.head.next;
      this.head.prev = this.last;
      this.last.next = this.head;
      this.size--;
      return this.head.next;
    }
    let i = 0;
    while (current.next.imgPath !== element.imgPath) {
      current = current.next;
      i++;
    }
    var temp = current.next.next;
    current.next = current.next.next;
    current.next.prev = current;
    this.size--;
    while (i < this.size - 1) {
      current = current.next;
      i++;
    }
    if (current === this.last) {
      this.last = current.prev;
    }
    current.next = this.head;
    this.head.prev = current;
    return temp;
  }
}
