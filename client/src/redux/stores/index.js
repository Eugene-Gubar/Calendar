import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
// import logger from "../middlewares/logger";
import logger from "redux-logger";
import { routerMiddleware } from "react-router-redux";
import history from "../../history";

import LogRocket from "logrocket";
LogRocket.init("i3t2ow/full-stack-react-development");

const middleware = [
  thunk,
  routerMiddleware(history),
  logger,
  LogRocket.reduxMiddleware()
];
const enhancer = applyMiddleware(...middleware);

export default createStore(rootReducer, {}, enhancer);
