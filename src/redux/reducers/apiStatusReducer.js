import * as types from "../actions/actionTypes";
import initialState from "./initialState";

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}

//state is being initialized as an empty array, because this will end up storing an array of courses
export default function apiStatusReducer(
  state = initialState.apiCallsInProgress,
  action
) {
  //because this reducer is simple ifs can be useful
  //thunks end with name of _SUCCESS so with helper function above
  //and the if-else statement I don't need a separate action-reducer combo to track when the apiCallsEnd
  if (action.type == types.BEGIN_API_CALL) {
    return state + 1;
  } else if (
    action.type === types.API_CALL_ERROR ||
    actionTypeEndsInSuccess(action.type)
  ) {
    return state - 1;
  }

  return state;
}
