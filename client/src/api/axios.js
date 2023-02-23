import _ from "axios";
import * as toast from "../components/Toastify/UserToastUtils";
import retrieveError from "./ExceptionHandler";

const baseURL = process.env.REACT_APP_API_BASEURL;
const apiTimeout = process.env.REACT_APP_API_TIMEOUT;

const axios = _.create({ baseURL });
axios.defaults.timeout = apiTimeout;

axios.interceptors.request.use(
  (request) => {
    toast.dismiss();
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
    promise.catch(({ code }) => {
      const { message, addToast } = retrieveError(code);
      addToast &&
        toast.error(message, {
          toastId: toast.TOAST_DISMISS_ID,
        });
    });
    return promise;
  }
);

export default axios;
