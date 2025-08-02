export default function capitalize(word) {
  const character = word[0];
  const capitalizedString = character.toUpperCase().concat(word.slice(1));
  return capitalizedString;
}
