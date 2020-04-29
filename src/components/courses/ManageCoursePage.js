import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadCourses } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";

//could make a function and use useState and useEffect but instead
//going with class component format for this page
function ManageCoursePage({ courses, authors, loadCourses, loadAuthors }) {
  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert("Loading courses failed" + error);
      });
    }
    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert("Loading authors failed" + error);
      });
    }
  }, []);

  return (
    <>
      <h2>Manage Course:</h2>
    </>
  );
}

ManageCoursePage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.object.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
};

//redux mapping function that indicates what states we'd like access to
function mapStateToProps(state) {
  return {
    courses: state.courses,
    authors: state.authors,
  };
}

//This is the bind action creators methods for dispatching the actions
//REdux mapping function that indicates what actions we'd like to handle
const mapDispatchToProps = {
  //this is an example of declaring the actions as an object.  When this is down redux knows to automatically wrap the action in a dispatch
  loadCourses: loadCourses,
  //can remove right hand side since they are the same name.  Shortcut for javascript
  loadAuthors,
};

//the connect function returns a function and then that function immediately calls our component (ManageCoursePage)
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);

//____________________________________________
//------------Saved code from earlier layouts
//____________________________________________
