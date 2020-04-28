import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/authors/";

export function getAuthors() {
  //promise based api that is built into modern browsers
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
