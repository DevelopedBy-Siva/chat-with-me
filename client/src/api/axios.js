import _ from "axios";

const baseURL = process.env.REACT_APP_API_BASEURL;
const apiTimeout = process.env.REACT_APP_API_TIMEOUT;

const axios = _.create({ baseURL });
axios.defaults.timeout = apiTimeout;

axios.interceptors.request.use(
  (request) => {
    // TODO
    // add Headers
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
    if (error.response.status !== 500) return promise;
    promise.catch(({ code }) => {});
    return promise;
  }
);

export default axios;
