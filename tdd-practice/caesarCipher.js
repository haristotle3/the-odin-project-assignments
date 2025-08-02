function getEncryptedChar(plaintextChar, offset, subtractor) {
  const charCodeValue =
    ((plaintextChar.charCodeAt(0) - subtractor + offset) % 26) + subtractor;
  return String.fromCharCode(charCodeValue);
}

export default function caesarCipher(string, offset) {
  const A = "A".charCodeAt(0);
  const a = "a".charCodeAt(0);
  const z = "z".charCodeAt(0);

  return string
    .split("")
    .map((char) => {
      if (char.charCodeAt(0) < A || char.charCodeAt(0) > z) return char;
      if (char.charCodeAt(0) < a) return getEncryptedChar(char, offset, A);
      else return getEncryptedChar(char, offset, a);
    })
    .join("");
}
