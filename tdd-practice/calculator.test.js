import Calculator from "./calculator.js";

describe("Calculator Object", () => {
  /*---------------Addition-----------------*/
  describe("Addition", () => {
    test("Add 1 + 1", () => {
      expect(Calculator.add(1, 1)).toBe(2);
    });

    test("Add 600 + 200", () => {
      expect(Calculator.add(600, 200)).toBe(800);
    });

    test("Undefined value y in add()", () => {
      expect(() => Calculator.add(9)).toThrow(Error);
    });

    test("Undefined value x and y in add()", () => {
      expect(() => Calculator.add()).toThrow(Error);
    });
  });

  /*--------Subtraction-----------*/
  describe("Subtraction", () => {
    test("Subtract 1 - 1", () => {
      expect(Calculator.subtract(1, 1)).toBe(0);
    });

    test("Subtract 123 - 234", () => {
      expect(Calculator.subtract(123, 234)).toBe(-111);
    });

    test("Undefined value y in subtract()", () => {
      expect(() => Calculator.subtract(9)).toThrow(Error);
    });

    test("Undefined value x and y in subtract()", () => {
      expect(() => Calculator.subtract()).toThrow(Error);
    });
  });

  /*--------Multiplication-----------*/
  describe("Multiplication", () => {
    test("Multiply 2 * 3", () => {
      expect(Calculator.multiply(2, 3)).toBe(6);
    });

    test("Multiply 23 * -1", () => {
      expect(Calculator.multiply(23, -1)).toBe(-23);
    });

    test("Undefined value y in multiply()", () => {
      expect(() => Calculator.multiply(9)).toThrow(Error);
    });

    test("Undefined value x and y in multiply()", () => {
      expect(() => Calculator.multiply()).toThrow(Error);
    });
  });

  /*--------Division-----------*/
  describe("Division", () => {
    test("Division 2 / 4", () => {
      expect(Calculator.divide(2, 4)).toBeCloseTo(0.5);
    });

    test("Division 60 / 10", () => {
      expect(Calculator.divide(60, 10)).toBe(6);
    });

    test("Division by zero", () => {
      expect(() => Calculator.divide(60, 0)).toThrow(Error("Division by zero"));
    });

    test("Undefined value y in divide()", () => {
      expect(() => Calculator.divide(9)).toThrow(Error);
    });

    test("Undefined value x and y in divide()", () => {
      expect(() => Calculator.divide()).toThrow(Error);
    });
  });
});
