export const getCurrentDateAndHour = () => {
  const now = new Date();

  // Get the local timezone
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Use the timeZone to format the date and hour
  const dateTimeOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: timeZone,
  };

  const formattedDateTime = new Intl.DateTimeFormat(
    "en-US",
    dateTimeOptions
  ).format(now);

  return formattedDateTime.replace(/,/g, ""); // Outputs something like: "2023-08-13 15:00"
};
export const formatDate = (date) => {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}