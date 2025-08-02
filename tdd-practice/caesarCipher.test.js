import caesarCipher from "./caesarCipher.js";

describe("Caesar Cipher", () => {
  test("Normal Cipher (1)", () => {
    expect(caesarCipher("ABC", 3)).toBe("DEF");
  });

  test("Normal Cipher (2)", () => {
    expect(caesarCipher("DEF", 5)).toBe("IJK");
  });

  test("Wrapping Cipher (1)", () => {
    expect(caesarCipher("xyz", 3)).toBe("abc");
  });

  test("Wrapping Cipher (2)", () => {
    expect(caesarCipher("WXYZ", 4)).toBe("ABCD");
  });

  test("Case preservation (1)", () => {
    expect(caesarCipher("HeLLo", 3)).toBe("KhOOr");
  });

  test("Case preservation (2)", () => {
    expect(caesarCipher("AzUrE", 6)).toBe("GfAxK");
  });

  test("Non alphabetic cipher", () => {
    expect(caesarCipher("Hello, World!", 3, 4)).toBe("Khoor, Zruog!");
  });
});
