export const SET_USER = "SET_USER";
export const ONETIME_INFO = "ONETIME_INFO";
export const CHANGE_USER_NAME = "CHANGE_USER_NAME";
export const CHANGE_DESCRIPTION = "CHANGE_DESCRIPTION";
export const CHANGE_AVATAR = "CHANGE_AVATAR";

export const setUser = (data) => {
  return {
    type: SET_USER,
    payload: {
      data,
    },
  };
};

export const updateOneTimeInfo = (payload) => {
  return {
    type: ONETIME_INFO,
    payload,
  };
};

export const updateUserName = (payload) => {
  return {
    type: CHANGE_USER_NAME,
    payload,
  };
};

export const updateDescription = (payload) => {
  return {
    type: CHANGE_DESCRIPTION,
    payload,
  };
};

export const updateAvatar = (payload) => {
  return {
    type: CHANGE_AVATAR,
    payload,
  };
};
