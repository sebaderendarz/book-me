const ordersParser = (orders) => {
  return orders.map((order) => {
    const dateTime = new Date(order);
    return {
      date: `${dateTime.getFullYear()}-${("0" + dateTime.getMonth()).slice(
        -2
      )}-${("0" + dateTime.getDate()).slice(-2)}`,
      hourMinute: `${("0" + dateTime.getHours()).slice(-2)}:${(
        "0" + dateTime.getMinutes()
      ).slice(-2)}`,
      isoFormat: order,
    };
  });
};

export default ordersParser;
