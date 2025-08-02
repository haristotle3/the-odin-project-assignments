import capitalize from "./capitalize";

describe("capitalize", () => {
  test("Simple word (1)", () => {
    expect(capitalize("harish")).toBe("Harish");
  });

  test("Simple word (2)", () => {
    expect(capitalize("akiyuki")).toBe("Akiyuki");
  });

  test("Already capitalized (1)", () => {
    expect(capitalize("Denji")).toBe("Denji");
  });

  test("Already capitalized (2)", () => {
    expect(capitalize("Manjiro")).toBe("Manjiro");
  });

  test("Multiple Words (1)", () => {
    expect(capitalize("hello world!")).toBe("Hello world!");
  });

  test("Special character in the beginning (1)", () => {
    expect(capitalize("!beginning")).toBe("!beginning");
  });
});
