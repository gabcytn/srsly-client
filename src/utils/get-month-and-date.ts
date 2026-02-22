export default function (dateParam: string) {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };
  const date = new Date(dateParam);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date parameter.");
  }
  return new Date(date).toLocaleDateString("en-US", options);
}
