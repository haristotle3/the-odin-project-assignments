import reverseString from "./reverseString";

describe("reverseString", () => {
  test("Simple word (1)", () => {
    expect(reverseString("harish")).toBe("hsirah");
  });

  test("Simple word (2)", () => {
    expect(reverseString("AKIYUKI")).toBe("IKUYIKA");
  });

  test("Word with special characters (1)", () => {
    expect(reverseString("@DENJI$")).toBe("$IJNED@");
  });

  test("Multiple words (1) ", () => {
    expect(reverseString("Hello world!")).toBe("!dlrow olleH");
  });

  test("Multiple words (2) ", () => {
    expect(reverseString("The quick brown fox jumps over the lazy dog.")).toBe(
      ".god yzal eht revo spmuj xof nworb kciuq ehT"
    );
  });
});
