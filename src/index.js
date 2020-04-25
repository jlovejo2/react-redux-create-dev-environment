import React from "react";
import { render } from "react-dom";

function Hi() {
  //handy way to get a spot to show up in the browser.  Will happen as long as dev tool is open in browser
  /*debugger;*/
  return <p>Hi.</p>;
}

render(<Hi />, document.getElementById("app"));
