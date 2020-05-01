import React from "react";
import { cleanup, render } from "react-testing-library";
import CourseForm from "./CourseForm";

//In react testing library components are always mounted

//cleanup function to run after each one of our tests
afterEach(cleanup);

//generic function for testing that prevents a buch of boilerplate code in tests
function renderCourseForm(args) {
  const defaultProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {},
  };

  const props = { ...defaultProps, ...args };
  return render(<CourseForm {...props} />);
}

it("should render Add Course header", () => {
  //grabbing getByText method from the render return on line 20 above
  const { getByText } = renderCourseForm();
  getByText("Add Course");
});

it('should label save button as "Save" when not saving', () => {
  const { getByText } = renderCourseForm();
  getByText("Save");
});

it('should label save button as "Saving" when saving', () => {
  const { getByText /*debug*/ } = renderCourseForm({ saving: true });
  //   debug();
  getByText("Saving...");
});
