export default function (toCompare: string) {
  const now = new Date();
  const today = getYearMonthDate(now);

  const dateToCompare = new Date(toCompare);
  if (Number.isNaN(dateToCompare.getMilliseconds())) {
    throw new Error("Invalid date.");
  }

  return today.getTime() === getYearMonthDate(dateToCompare).getTime();
}

function getYearMonthDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
