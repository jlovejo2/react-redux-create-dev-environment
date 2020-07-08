import React, { useState } from "react";
import PropTypes from "prop-types";
import { loadRonSwansonQuotes } from "../redux/actions/ronSwansonApiActions";
import { connect } from "react-redux";

export function SearchQuotes({ quotes, history, ...props }) {
  const [ronSwansonQuotes, setRonSwansonQuotes] = useState({});
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleSearchApi = () => {
    console.log("searching...");
    loadRonSwansonQuotes();
    // .then(() => {
    //   console.log(quotes);
    // })
    // .catch((error) => {
    //   alert("Loading Ron Swanson Quotes failed" + error);
    // });
    setRonSwansonQuotes({ ...ronSwansonQuotes, one: quotes });

    console.log(ronSwansonQuotes);
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
  quotes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  loadRonSwansonQuotes: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  console.log(ownProps);

  return {
    quotes: state.quotes,
  };
}

const mapDispatchToProps = {
  loadRonSwansonQuotes,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchQuotes);
