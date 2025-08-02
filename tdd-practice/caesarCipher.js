export default function caesarCipher(string, offset) {
  const A = "A".charCodeAt(0);
  const Z = "Z".charCodeAt(0);
  const a = "a".charCodeAt(0);
  const z = "z".charCodeAt(0);

  return string
    .split("")
    .map((char) => {
      if (char.charCodeAt(0) < A || char.charCodeAt(0) > z) return char;
      if (char.charCodeAt(0) < a) {
        return String.fromCharCode(
          ((char.charCodeAt(0) - A + offset) % 26) + A
        );
      } else {
        return String.fromCharCode(
          ((char.charCodeAt(0) - a + offset) % 26) + a
        );
      }
    })
    .join("");
}
