import * as types from "../actions/actionTypes";
import initialState from "./initialState";

//state is being initialized as an empty array, because this will end up storing an array of courses
export default function authorReducer(state = initialState.authors, action) {
  //   console.log(action.type);
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors;

    //always declare a default, it results in reducer returning untouched state for actions it doesn't care about
    default:
      return state;
  }
}
