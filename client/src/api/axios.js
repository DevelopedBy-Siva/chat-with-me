import _ from "axios";

const baseURL = process.env.REACT_APP_API_BASEURL;
const apiTimeout = process.env.REACT_APP_API_TIMEOUT;

const axios = _.create({ baseURL });
axios.defaults.timeout = apiTimeout;
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  (request) => {
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
    return promise;
  }
);

export default axios;
