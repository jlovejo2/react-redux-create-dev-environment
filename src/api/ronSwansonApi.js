import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/authors/";

export function getRonSwanson() {
  //promise based api that is built into modern browsers
  return fetch("https://ron-swanson-quotes.herokuapp.com/v2/quotes")
    .then(handleResponse)
    .catch(handleError);
}
