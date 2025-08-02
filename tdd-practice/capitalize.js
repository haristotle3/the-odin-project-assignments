export default function capitalize(string) {
  const character = string[0];
  const capitalizedString = character.toUpperCase().concat(string.slice(1));
  return capitalizedString;
}
