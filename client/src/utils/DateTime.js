import _ from "lodash";
import moment from "moment";

import { filterBy_Name_Nickname } from "./InputHandler";

export function getContactsTimestamp(utc) {
  if (!utc || utc.trim().length === 0) return "";

  const localDate = new Date(utc);
  const tmstp = moment(localDate);
  const diffInDays = moment().diff(tmstp, "days");
  let toDisplay;
  if (diffInDays === 0) toDisplay = tmstp.format("LT");
  else if (diffInDays < 4) toDisplay = tmstp.fromNow();
  else toDisplay = tmstp.format("ll");
  return toDisplay;
}

export function orderContactsDesc(searchInput, data) {
  const filteredData = filterBy_Name_Nickname(searchInput, data);
  return _.orderBy(
    filteredData,
    function (o) {
      const timestamp = o.lastMessage.timestamp;
      if (!timestamp) return Number.MIN_SAFE_INTEGER;
      return new Date(o.lastMessage.timestamp);
    },
    ["desc"]
  );
}

export function getMessageTime(utc = new Date().toUTCString()) {
  const localDate = new Date(utc);
  const tmstp = moment(localDate).format("LT");
  return tmstp;
}

export function sortAndGroupMsgs(messages) {
  const sorted = _.orderBy(
    messages,
    function (msg) {
      return new Date(msg.createdAt);
    },
    ["desc"]
  );

  const grouped = _.groupBy(sorted, (msg) =>
    moment(new Date(msg.createdAt)).format("LL")
  );
  return grouped;
}

export function isTodayOrYesterday(date) {
  if (date === moment().format("LL")) return "Today";

  const localDate = new Date();
  localDate.setDate(localDate.getDate() - 1);
  if (date === moment(localDate).format("LL")) return "Yesterday";

  return date;
}

export function sortDatesDesc(data = []) {
  return data.sort(
    (a, b) => moment(new Date(b)).valueOf() - moment(new Date(a)).valueOf()
  );
}

export function getDateTime_LL_format(utc) {
  const localDate = new Date(utc);
  const tmstp = moment(localDate).format("LL");
  return tmstp;
}
