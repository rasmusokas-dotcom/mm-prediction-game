const ESTONIA_TIMEZONE = "Europe/Tallinn";

export function getEstonianDateKey(date) {
  return new Date(date).toLocaleDateString("sv-SE", {
    timeZone: ESTONIA_TIMEZONE,
  });
}

export function getTodayEstonianDateKey() {
  return getEstonianDateKey(new Date());
}

export function getYesterdayEstonianDateKey() {
  const estonianToday = getTodayEstonianDateKey();
  const yesterday = new Date(`${estonianToday}T12:00:00`);
  yesterday.setDate(yesterday.getDate() - 1);

  return getEstonianDateKey(yesterday);
}
