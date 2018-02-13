import { EVENT_FORM_SHOW, EVENT_FORM_HIDE } from "../../constants/constants";

const eventDay = {
  data: {
    title: "",
    description: "",
    dateBegin: null,
    dateEnd: null,
    timeBegin: null,
    timeEnd: null
  },
  show: false
};

export default function eventFormDay(state = eventDay, action) {
  switch (action.type) {
    case EVENT_FORM_SHOW:
      return { ...state, show: true, data: { ...state.data, ...action.data } };
    case EVENT_FORM_HIDE:
      return { ...state, show: false };
    default:
      return state;
  }
}
