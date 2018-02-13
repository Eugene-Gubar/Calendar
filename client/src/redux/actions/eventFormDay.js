import { reset } from "redux-form";
import { EVENT_FORM_SHOW, EVENT_FORM_HIDE } from "../../constants/constants";

export function eventFormShow(data) {
  return { type: EVENT_FORM_SHOW, data };
}

export function eventFormHide() {
  return dispatch => {
    dispatch(reset("event"));
    dispatch({ type: EVENT_FORM_HIDE });
  };
}
