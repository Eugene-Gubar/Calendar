import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import { routerReducer as router } from "react-router-redux";
import userAuth from "./auth";
import eventDay from "./eventFormDay";
import space from "./space";
import events from "./events";

export default combineReducers({
  userAuth,
  eventDay,
  space,
  events,
  form,
  router
});
