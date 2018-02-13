
// This is example middlewares
export default store => next => action => {
  console.log("**********", "State before: ", store.getState());
  console.log("**********", "Dispatching: ", action);
  next(action);
  console.log("**********", "State after: ", store.getState());
};
