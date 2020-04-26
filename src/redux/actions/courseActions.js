export function createCourse(course) {
  //actions must have a type property
  //pass course data
  return { type: "CREATE_COURSE", course: course };
}
