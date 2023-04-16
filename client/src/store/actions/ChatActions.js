export const GET_CHATS = "GET_CHATS";
export const CHATS_LOADING = "CHATS_LOADING";
export const CHATS_ERROR = "CHATS_ERROR";
export const SET_ACTIVE = "SET_ACTIVE";
export const READY_TO_SEND_MSG = "READY_TO_SEND_MSG";
export const MSG_SEND_STATUS = "MSG_SEND_STATUS";

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

export const chatsError = (errorId, isPrivate) => {
  return {
    type: CHATS_ERROR,
    payload: {
      errorId,
      isPrivate,
    },
  };
};

export const setActive = (payload, isPrivate = true) => {
  return {
    type: SET_ACTIVE,
    payload,
    isPrivate,
  };
};

export const readyToSendMsg = (data, chatId, currentDate) => {
  return {
    type: READY_TO_SEND_MSG,
    payload: {
      data,
      chatId,
      currentDate,
    },
  };
};

export const updateMessageSendStatus = (chatId, msgId, status, dateGroup) => {
  return {
    type: MSG_SEND_STATUS,
    payload: {
      msgId,
      chatId,
      status,
      dateGroup,
    },
  };
};
