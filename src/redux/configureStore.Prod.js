import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
//middleware for redux store
import thunk from "redux-thunk";

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
}
