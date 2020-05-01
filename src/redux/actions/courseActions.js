import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";
import { beginApiCall } from "./apiStatusActions";
import { apiCallError } from "./apiStatusActions";

export function loadCoursesSuccess(courses) {
  return {
    type: types.LOAD_COURSES_SUCCESS,
    courses /*can be written as just courses*/,
  };
}

export function createCourseSuccess(course) {
  return {
    type: types.CREATE_COURSE_SUCCESS,
    course /*can be written as just courses*/,
  };
}

export function updateCourseSuccess(course) {
  return {
    type: types.UPDATE_COURSE_SUCCESS,
    course /*can be written as just courses*/,
  };
}

//thunk
export function loadCourses() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .getCourses()
      .then((courses) => {
        console.log("action: loading courses", courses);
        dispatch(loadCoursesSuccess(courses));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

//also thunk
export function saveCourse(course) {
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return courseApi
      .saveCourse(course)
      .then((savedCourse) => {
        console.log("saving course", savedCourse);
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
