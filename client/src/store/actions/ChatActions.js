export const GET_CHATS = "GET_CHATS";
export const CHATS_LOADING = "CHATS_LOADING";
export const CHATS_ERROR = "CHATS_ERROR";

export const getChats = (payload) => {
  return {
    type: GET_CHATS,
    payload,
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
