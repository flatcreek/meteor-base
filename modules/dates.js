import { DateTime } from 'luxon';

export const monthDayYear = (timestamp, timezone) => {
  if (!timestamp) {
    return DateTime.now().toLocaleString(DateTime.DATE_FULL);
  }
  if (timezone) {
    return DateTime.fromJSDate(timestamp).toLocaleString(DateTime.DATE_FULL);
  }
  return DateTime.fromJSDate(timestamp).toLocaleString(DateTime.DATE_FULL);
};

export const monthDayYearAtTime = (timestamp, timezone) => {
  if (!timestamp) {
    return DateTime.now().toLocaleString(DateTime.DATETIME_FULL);
  }
  if (timezone) {
    return DateTime.fromJSDate(timestamp, { zone: timezone }).toLocaleString(
      DateTime.DATETIME_FULL,
    );
  }
  return DateTime.fromJSDate(timestamp).toLocaleString(DateTime.DATETIME_FULL);
};

export const timeago = (timestamp, timezone) => {
  if (timezone) {
    return DateTime.fromJSDate(timestamp, { zone: timezone }).toRelative();
  }
  return DateTime.fromJSDate(timestamp).toRelative();
};

export const timeAdd = (timestamp, amount, range, timezone) => {
  if (!timestamp) {
    return DateTime.now()
      .plus({ [range]: amount })
      .toLocaleString();
  }
  if (timezone) {
    return DateTime.fromJSDate(timestamp, { zone: timezone })
      .plus({ [range]: amount })
      .toLocaleString();
  }
  return DateTime.fromJSDate(timestamp)
    .plus({ [range]: amount })
    .toLocaleString();
};

export const year = (timestamp, timezone) => {
  if (!timestamp) {
    return DateTime.now().toFormat('yyyy');
  }
  if (timezone) {
    return DateTime.fromJSDate(timestamp, { zone: timezone }).toFormat('yyyy');
  }
  return DateTime.fromJSDate(timestamp).toFormat('yyyy');
};

export const iso = (timestamp, timezone) => {
  if (!timestamp) {
    return DateTime.now().toISO();
  }
  if (timezone) {
    return DateTime.fromJSDate(timestamp, { zone: timezone }).toISO();
  }
  return DateTime.fromJSDate(timestamp).toISO();
};
