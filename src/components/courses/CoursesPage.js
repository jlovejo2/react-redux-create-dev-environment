import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

//could make a function and use useState and useEffect but instead
//going with class component format for this page
class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false,
  };
  componentDidMount() {
    const { courses, authors, actions } = this.props;

    if (courses.length === 0) {
      actions.loadCourses().catch((error) => {
        alert("Loading courses failed" + error);
      });
    }
    if (authors.length === 0) {
      this.props.actions.loadAuthors().catch((error) => {
        alert("Loading authors failed" + error);
      });
    }
  }

  //alternative method for async calls.
  //Benefits to async await is that you can use try/catch combinations
  //Also have syntactic sugar
  handleDeleteCourse = async (course) => {
    toast.success("Course Deleted");
    try {
      await this.props.actions.deleteCourse(course);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autClose: false });
    }
  };

  render() {
    return (
      <>
        {/* if the redirectToAddCoursePage is true then it will render the add course page */}
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}

        <h2>Course:</h2>

        {this.props.loading ? (
          <Spinner />
        ) : (
          // fragment tags avoid needless parent divs in the dom
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>
            <CourseList
              courses={this.props.courses}
              onDeleteClick={this.handleDeleteCourse}
            />
          </>
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  actions: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name,
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0,
  };
}

//This is a method of declaring mapDispatchToprops as an object
//very concise methodology
// const mapDispatchToProps = {
//   createCourse: courseActions.createCourse,
// };

//This is the bind action creators methods for dispatching the actions
function mapDispatchToProps(dispatch) {
  return {
    //must pass action creators to dispatch. Dispatch is the function that notifies redux about an action
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
    },
  };
}

//the connect function returns a function and then that function immediately calls our component (CoursesPage)
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);

//____________________________________________
//------------Saved code from earlier layouts
//____________________________________________

//this is necessary because scope of this is lost when entering the handlechange function
//This is something that could be added in the contructor which was edited out
//this.handleChange = this.handleChange.bind(this);

//This is a class field and babel will translate it for browser
//This works just like delcaring bind in the contructor because arrow funtions inherit the binding context of their enclosing scope
//   handleChange = (event) => {
//     //copy the state with the spread operator, overwrote the title with value from event
//     //used spread because we want react state to be immutable
//     console.log(this.state);
//     const course = { ...this.state.course, title: event.target.value };

//     //can also write as this.setState({ course }), shorthand because the two words are the same
//     this.setState({ course: course });
//     console.log(this.state.course.title);
//   };

//   handleSubmit = (event) => {
//     event.preventDefault();
//     this.props.actions.createCourse(this.state.course);
//   };

//Add the onSubmit to the form tag allows for the user to be able to submit the form with enter key as well as click
