export const GET_CHATS = "GET_CHATS";
export const CHATS_LOADING = "CHATS_LOADING";
export const CHATS_ERROR = "CHATS_ERROR";
export const SET_ACTIVE = "SET_ACTIVE";

export const getChats = (id, data) => {
  return {
    type: GET_CHATS,
    payload: { id, data },
  };
};

export const chatsLoading = () => {
  return {
    type: CHATS_LOADING,
  };
};

export const chatsError = (payload) => {
  return {
    type: CHATS_ERROR,
    payload,
  };
};

export const setActive = (payload) => {
  return {
    type: SET_ACTIVE,
    payload,
  };
};
