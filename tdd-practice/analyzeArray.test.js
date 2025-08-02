import analyzeArray from "./analyzeArray.js";

describe("Analyze array", () => {
  test("Given case", () => {
    expect(analyzeArray([1, 8, 3, 4, 2, 6])).toEqual({
      average: 4,
      min: 1,
      max: 8,
      length: 6,
    });
  });

  test("Another example", () => {
    expect(analyzeArray([7, 5, 3, 2, 9, 16, 25, 67, -1])).toEqual({
      average: 14.77,
      min: -1,
      max: 67,
      length: 9,
    });
  });
});
