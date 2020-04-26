import * as types from "./actionTypes";

export function createCourse(course) {
  //actions must have a type property
  //pass course data
  return { type: types.CREATE_COURSE, course: course };
}
