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
