import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

//could make a function and use useState and useEffect but instead
//going with class component format for this page
class CoursesPage extends React.Component {
  state = {
    course: {
      title: "",
    },
  };

  //this is necessary because scope of this is lost when entering the handlechange function
  //This is something that could be added in the contructor which was edited out
  //this.handleChange = this.handleChange.bind(this);

  //This is a class field and babel will translate it for browser
  //This works just like delcaring bind in the contructor because arrow funtions inherit the binding context of their enclosing scope
  handleChange = (event) => {
    //copy the state with the spread operator, overwrote the title with value from event
    //used spread because we want react state to be immutable
    console.log(this.state);
    const course = { ...this.state.course, title: event.target.value };

    //can also write as this.setState({ course }), shorthand because the two words are the same
    this.setState({ course: course });
    console.log(this.state.course.title);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.actions.createCourse(this.state.course);
  };

  render() {
    return (
      //Add the onSubmit to the form tag allows for the user to be able to submit the form with enter key as well as click
      <form onSubmit={this.handleSubmit}>
        <h2>Course:</h2>
        <h3>Add Course</h3>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.course.title}
        />

        <input type="submit" value="save" />
        {this.props.courses.map((course) => (
          <div key={course.title}>{course.title}</div>
        ))}
      </form>
    );
  }
}

CoursesPage.propTypes = {
  actions: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    courses: state.courses,
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
    actions: bindActionCreators(courseActions, dispatch),
  };
}

//the connect function returns a function and then that function immediately calls our component (CoursesPage)
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
