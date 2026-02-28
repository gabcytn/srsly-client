export default function (word: string) {
  const str = word.toLowerCase();
  return str.charAt(0).toUpperCase() + str.substring(1);
}
