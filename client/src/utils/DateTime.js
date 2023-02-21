import _ from "lodash";
import moment from "moment";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function getDate(timestamp = new Date()) {
  const dateTime = new Date(timestamp);
  const month = months[dateTime.getMonth()];
  const day = days[dateTime.getDay()];
  const yr = dateTime.getFullYear();
  const date = `${day}, ${dateTime.getDate()} ${month} ${yr}`;
  return date;
}

export function sortByTimestamp(data) {
  data.sort(
    (objA, objB) =>
      Number(new Date(objB.timestamp)) - Number(new Date(objA.timestamp))
  );
}

export function groupByTimestamp(data) {
  const response = new Map();
  for (let obj of data) {
    const formattedDate = getDate(obj.timestamp);

    if (getDate() === formattedDate) {
      if (response.has("Today")) {
        response.get("Today").push({ ...obj });
        continue;
      }
      response.set("Today", [{ ...obj }]);
      continue;
    }

    const currentDate = new Date();
    if (
      getDate(currentDate.setDate(currentDate.getDate() - 1)) ===
      getDate(obj.timestamp)
    ) {
      if (response.has("Yesterday")) {
        response.get("Yesterday").push({ ...obj });
        continue;
      }
      response.set("Yesterday", [{ ...obj }]);
      continue;
    }

    if (response.has(getDate(formattedDate))) {
      response.get(getDate(formattedDate)).push({ ...obj });
      continue;
    }
    response.set(getDate(formattedDate), [{ ...obj }]);
  }
  return [...response].map(([date, messages]) => ({ date, messages }));
}

export function getContactsTimestamp(utc) {
  if (!utc || utc.trim().length === 0) return "";

  const localDate = new Date(utc);
  const tmstp = moment(localDate);
  const diffInDays = moment().diff(tmstp, "days");
  let toDisplay;
  if (diffInDays === 0) toDisplay = tmstp.format("LT");
  else if (diffInDays < 4) toDisplay = tmstp.fromNow();
  else toDisplay = tmstp.format("L");
  return toDisplay;
}

export function orderContactsDesc(data) {
  return _.orderBy(
    data,
    function (o) {
      return o.lastMsgTstmp;
    },
    ["desc"]
  );
}
