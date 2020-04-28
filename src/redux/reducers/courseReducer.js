import * as types from "../actions/actionTypes";

//state is being initialized as an empty array, because this will end up storing an array of courses
export default function courseReducer(state = [], action) {
  switch (action.type) {
    case types.CREATE_COURSE:
      //can't use push because it mutates state
      return [...state, { ...action.course }];

    case types.LOAD_COURSES_SUCCESS:
      return action.courses;

    //always declare a default, it results in reducer returning untouched state for actions it doesn't care about
    default:
      return state;
  }
}
