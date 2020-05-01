import React from "react";
import CourseForm from "./CourseForm";
import renderer from "react-test-renderer";
import { courses, authors } from "../../../tools/mockData";

it("sets submit button label 'Saving...' when saving is true", () => {
  const tree = renderer.create(
    <CourseForm
      course={courses[0]}
      authors={authors}
      //jest.fn() creates an empty mock function
      onSave={jest.fn()}
      onChange={jest.fn()}
      saving
    />
  );

  //assertion
  expect(tree).toMatchSnapshot();
});

it("sets submit button label 'Save' when saving is false", () => {
  const tree = renderer.create(
    <CourseForm
      course={courses[0]}
      authors={authors}
      //jest.fn() creates an empty mock function
      onSave={jest.fn()}
      onChange={jest.fn()}
      saving={false}
    />
  );

  //assertion
  expect(tree).toMatchSnapshot();
});
