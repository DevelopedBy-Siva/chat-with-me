import _ from "axios";

import { getJWTToken, removeIsLoggedIn } from "../utils/UserLocal";

const baseURL = process.env.REACT_APP_API_BASEURL + "/api";
const apiTimeout = process.env.REACT_APP_API_TIMEOUT;

const axios = _.create({ baseURL });
axios.defaults.timeout = apiTimeout;

axios.interceptors.request.use(
  (request) => {
    request.headers["access_token"] = getJWTToken();
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const promise = Promise.reject(error);
    try {
      if (
        (error.response.status === 401 || error.response.status === 403) &&
        !window.location.pathname.includes("/sign-in")
      ) {
        removeIsLoggedIn();
        window.location = "/sign-in";
      }
    } catch (_) {}
    return promise;
  }
);

export default axios;
