import parseDateTimeToDateString from "./parseDateTimeToDateString";
import parseDateTimeToHourMinuteString from "./parseDateTimeToHourMinuteString";

const ordersParser = (orders) => {
  return orders.map((order) => {
    const dateTime = new Date(order);
    return {
      date: parseDateTimeToDateString(dateTime),
      hourMinute: parseDateTimeToHourMinuteString(dateTime),
      dateTime: order,
    };
  });
};

export default ordersParser;
