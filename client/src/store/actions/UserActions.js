export const SET_USER = "SET_USER";
export const ONETIME_INFO = "ONETIME_INFO";

export const setUser = (data, oneTimeInfo = false) => {
  return {
    type: SET_USER,
    payload: {
      data,
      oneTimeInfo,
    },
  };
};

export const updateOneTimeInfo = (payload) => {
  return {
    type: ONETIME_INFO,
    payload,
  };
};
