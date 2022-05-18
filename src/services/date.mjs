export function NOW() {
  return new Date();
}

export function TODAY() {
  return new Date(NOW().getFullYear(), NOW().getMonth(), NOW().getDate());
}

console.log(NOW().toString());

export function dateFromTime(startDate, time) {
  let [hours, mins, secs] = time.split(":");
  return new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate(),
    hours,
    mins
    // secs
  );
}

export function getExpirationDate(time) {
  let expirationDate = dateFromTime(TODAY(), time);
  if (expirationDate < NOW()) {
    expirationDate.setDate(expirationDate.getDate() + 1);
  }
  console.log(time, expirationDate.toString());
}
