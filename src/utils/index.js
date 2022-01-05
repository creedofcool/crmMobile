import moment from "moment";

export const randomDate = (start, end, startHour, endHour) => {
  var date = new Date(+start + Math.random() * (end - start));
  var hour = (startHour + Math.random() * (endHour - startHour)) | 0;
  date.setHours(hour);
  return date;
};

export const getRandomDate = (dateFormat="yyyy-MM-DD HH:mm:ss") => {
  return moment(randomDate(new Date(2020, 0, 1), new Date(), 8, 22)).format(dateFormat);
};