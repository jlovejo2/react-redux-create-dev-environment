import React from "react";
import { mount } from "enzyme";
import { authors, newCourse, courses } from "../../../tools/mockData";
//this line is not import default export.  {} is a named import.
import { ManageCoursePage } from "./ManageCoursePage";

//Same factory used in react-testing-library and enzyme tests on presentation components
function render(args) {
  const defaultProps = {
    authors,
    courses,
    //Passed from REact router in real app, sp just stubbing in for test
    //could also chose to use memoryRouter as shown in header.test.js
    history: {},
    saveCourse: jest.fn(),
    loadAuthors: jest.fn(),
    loadCourses: jest.fn(),
    course: newCourse,
    match: {},
  };

  const props = { ...defaultProps, ...args };

  //calling mount so will render component and children
  return mount(<ManageCoursePage {...props} />);

  //solution to wrap rendered component in a provider to fix can't find store error
  //or use method used above where you export component directly in the file itself.  So manageCoursePage.js exports function <component name>
  // return mount(<Provider store={store}><ManageCoursePage {...props} /></Provider>)
}

it("sets error when attempting to save an empty title field", () => {
  const wrapper = render();
  //line below is simulating a submit on an empty form
  wrapper.find("form").simulate("submit");
  //find the first alert class element in render and set to variable
  const error = wrapper.find(".alert").first();
  //check that that error reads "Title is required";
  expect(error.text()).toBe("Title is required.");
});
