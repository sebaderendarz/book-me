// needed fields: hourMinute, dateTime (no timezone), isAvail

// what to base results on:
// 1. is this date a working day for barber
// 2. hours of the day
// 3. is barber present this day
// 4. is already booked order for this date and time?

// generate avail for all timemoxes with avail false and then validate all

const workingDaysToDaysRangeParser = (workingDays) => {
  if (workingDays === "Monday-Friday") {
    return { startDay: 1, endDay: 5 };
  }
  if (workingDays === "Monday-Saturday") {
    return { startDay: 1, endDay: 6 };
  }
  return { startDay: 0, endDay: 6 };
};

const openHoursToHoursRangeParser = (openHours) => {
  if (openHours === "8AM-4PM") {
    return { startHour: 8, endHour: 16 };
  }
  if (openHours === "9AM-5PM") {
    return { startHour: 9, endHour: 17 };
  }
  if (openHours === "10AM-6PM") {
    return { startHour: 10, endHour: 18 };
  }
  if (openHours === "11AM-7PM") {
    return { startHour: 11, endHour: 19 };
  }
  return { startHour: 12, endHour: 20 };
};

const generateInitialTimeboxes = ({ date, openHours }) => {
  const timeboxes = [];
  for (let hour = openHours.startHour; hour < openHours.endHour; hour++) {
    timeboxes.push({
      isAvail: false,
      hourMinute: `${hour}:00`,
      dateTime: `${date}T${hour}:00:00`,
    });
    timeboxes.push({
      isAvail: false,
      hourMinute: `${hour}:30`,
      dateTime: `${date}T${hour}:30:00`,
    });
  }
  return timeboxes;
};

const serviceTimesGenerator = ({ absences, date, orders, offer }) => {
  const workingDaysRange = workingDaysToDaysRangeParser(offer.working_days);
  const openHoursRange = openHoursToHoursRangeParser(offer.open_hours);
  let timeboxes = generateInitialTimeboxes({
    date,
    openHours: openHoursRange,
  });
  const dayOfWeek = new Date(date).getDay();
  if (
    dayOfWeek < workingDaysRange.startDay ||
    dayOfWeek > workingDaysRange.endDay
  ) {
    return timeboxes;
  }
  for (let absence of absences) {
    if (absence.start_date <= date && date <= absence.end_date) {
      return timeboxes;
    }
  }
  // TODO seems that timeboxins based on orders does not work?
  // simple includes is incorrect because orders is complex object!
  // check if you can simplify parsed orders
  console.log(orders);
  return timeboxes.map((timebox) => {
    if (orders.includes(timebox.dateTime)) {
      return timebox;
    }
    return { ...timebox, isAvail: true };
  });
};

export default serviceTimesGenerator;
