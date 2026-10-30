export default function (n: any) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
