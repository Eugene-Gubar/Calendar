import moment from "moment";

export const INCREMENT = "INCREMENT";
export const LOAD_USERS = "LOAD_USERS";

// auth
export const REGISTER = "REGISTER";
export const REGISTER_ERROR = "REGISTER_ERROR";
export const LOGIN = "LOGIN";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGOUT = "LOGOUT";

// event
export const EVENT_FORM_SHOW = "EVENT_FORM_SHOW";
export const EVENT_FORM_HIDE = "EVENT_FORM_HIDE";

// space
export const CHANGE_MINI_SPACE = "CHANGE_MINI_SPACE";
export const INCR_MINI_SPACE = "INCR_MINI_SPACE";
export const DECR_MINI_SPACE = "DECR_MINI_SPACE";
export const CHANGE_SPACE = "CHANGE_SPACE";

// selected date
export const CHANGE_DATE = "CHANGE_CURRENT_DATE";

// calendar
export const FULL_WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
export const WEEKDAYS = FULL_WEEKDAYS.map(val => val.substr(0, 3));
export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
export const NUMBER_OF_WEEKS = 6;
export const DAYS_IN_WEEK = 7;
export const NOW = moment();
export const TODAY = moment(0, "HH");
export const MONTHS_IN_YEAR = 12;
export const DAY = moment.duration(1, "days");
export const DAYS_IN_MONTH_SPACE = 42;
export const WEEK = DAY * DAYS_IN_WEEK;

// events array
export const EVENTS_ADD = "EVENTS_ADD";
export const EVENT_ADD = "EVENT_ADD";
export const EVENT_REMOVE = "EVENT_REMOVE";
export const EVENT_CHANGE = "EVENT_CHANGE";

// close-open
export const EVENT_WINDOW_SHOW = "EVENT_WINDOW_SHOW";
export const EVENT_WINDOW_HIDE = "EVENT_WINDOW_HIDE";

// events fetching
export const EVENTS_FETCHING = "EVENTS_FETCHING";
export const EVENTS_FETCH_ERROR = "EVENTS_FETCH_ERROR";
export const EVENTS_FETCH_OK = "EVENTS_FETCH_OK";
