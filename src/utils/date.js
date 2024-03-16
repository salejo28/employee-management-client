export const formatDate = (date) => {
  const d = date ? new Date(date) : new Date();
  const year = d.getFullYear();
  let day = "" + d.getDate();
  let month = "" + (d.getMonth() + 1);
  if (day.length < 2) {
    day = "0" + day;
  }

  if (month.length < 2) {
    month = "0" + month;
  }

  return [year, month, day].join("/");
};

export const formatHour = (date) => {
  const d = new Date(date);
  let hour = "" + d.getHours();
  let minutes = "" + d.getMinutes();

  if (hour.length < 2) hour = "0" + hour;
  if (minutes.length < 2) minutes = "0" + minutes;

  return [hour, minutes].join(":");
};

export const formatDateWithHour = (date) =>
  `${formatDate(date)} ${formatHour(date)}`;