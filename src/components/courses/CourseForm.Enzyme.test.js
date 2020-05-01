import React from "react";
import CourseForm from "./CourseForm";
import { shallow } from "enzyme";

//two types of enzyme render shallow vs mount
// shallow: no DOM createDispatchHook, no child components are rendered
// mount: DOM is created in memory via JSDOM, child components are rendered

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
  return shallow(<CourseForm {...props} />);
}

it("renders form and header", () => {
  const wrapper = renderCourseForm();
  //useful for problem solving code
  //   console.log(wrapper.debug());
  //enzyme has the find function with allows for css find tags
  expect(wrapper.find("form").length).toBe(1);
  expect(wrapper.find("h2").text()).toEqual("Add Course");
});

it("labels save button as 'Save' when not saving", () => {
  const wrapper = renderCourseForm({});
  expect(wrapper.find("button").text()).toBe("Save");
});

it("labels save buttons as 'Saving...' when saving", () => {
  const wrapper = renderCourseForm({ saving: true });
  expect(wrapper.find("button").text()).toBe("Saving...");
});
