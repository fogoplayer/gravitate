export const NOW = new Date();

export const TODAY = new Date(
  NOW.getUTCFullYear(),
  NOW.getUTCMonth(),
  NOW.getUTCDay()
);

export function dateFromTime(startDate, time) {
  let [hours, mins, secs] = time.split(":");
  return new Date(
    startDate.getYear(),
    startDate.getMonth(),
    startDate.getDay(),
    hours,
    mins,
    secs
  );
}

export function getExpirationDate(time) {
  let expirationDate = dateFromTime(startDate, time);
  if (expirationDate < new Date()) {
    expirationDate.setDate(date.getDate() + 1);
  }
}
