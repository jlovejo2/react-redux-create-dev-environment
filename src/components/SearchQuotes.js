import React from "react";
import PropTypes from "prop-types";
import { loadRonSwansonQuotes } from "../redux/actions/ronSwansonApiActions";
import { connect } from "react-redux";

export function SearchQuotes({ history, ...props }) {
  const handleSearchApi = () => {
    console.log("searching...");
  };

  return (
    <>
      <h1>Select the api that you would like to search for quotes from</h1>
      <button onClick={handleSearchApi} className={"btn btn-primary"}>
        Click to search
      </button>
    </>
  );
}

SearchQuotes.propTypes = {
  history: PropTypes.object.isRequired,
  loadRonSwansonQuotes: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  console.log(ownProps);

  return {};
}

const mapDispatchToProps = {
  loadRonSwansonQuotes,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchQuotes);
