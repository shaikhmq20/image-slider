export default class Stack {
  constructor() {
    this.size = 0;
    this.top = null;
    this.container = [];
  }

  // Check whether stack is empty
  isEmpty() {
    return this.size === 0;
  }

  // Puts element at the top of the stack
  push_back(element) {
    this.container.push(element);
    this.top = element;
    this.size++;
  }

  // Removes element from the top of the stack
  pop_back() {
    if (!this.isEmpty()) {
      const pop = this.container.pop();
      this.size--;
      this.top = this.container[this.size - 1];
      return pop;
    }
    return null;
  }
}
