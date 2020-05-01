import { createStore } from "redux";
import rootReducer from "./reducers";
import initialState from "./reducers/initialState";
import * as courseActions from "./actions/courseActions";

it("Should handle creating courses", function () {
  //arrange
  const store = createStore(rootReducer, initialState);
  const course = {
    title: "Clean Code",
  };

  //act
  const action = courseActions.createCourseSuccess(course);
  store.dispatch(action);

  //assert
  const createdCourse = store.getState().courses[0];
  expect(createdCourse).toEqual(course);
});

//additional tests mentioned that could be added
//could even create an array of actions above and assert that final result is expected
//dispatch two create course success actions and update success action and assert that final store as expected number of courses and values
