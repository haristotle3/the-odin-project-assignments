export default class Calculator {
  constructor() {}
  static add(x, y) {
    if (x === undefined || y === undefined)
      throw new Error("One of the values undefined.");
    return x + y;
  }

  static subtract(x, y) {
    if (x === undefined || y === undefined)
      throw new Error("One of the values undefined.");
    return x - y;
  }

  static multiply(x, y) {
    if (x === undefined || y === undefined)
      throw new Error("One of the values undefined.");
    return x * y;
  }

  static divide(x, y) {
    if (y === 0) throw new Error("Division by zero");
    if (x === undefined || y === undefined)
      throw new Error("One of the values undefined.");
    return x / y;
  }
}
