const parseDateTimeToHourMinuteString = (dateTime) =>
  `${("0" + dateTime.getHours()).slice(-2)}:${(
    "0" + dateTime.getMinutes()
  ).slice(-2)}`;

export default parseDateTimeToHourMinuteString;
