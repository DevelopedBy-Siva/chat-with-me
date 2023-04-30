export const GET_CHATS = "GET_CHATS";
export const CHATS_LOADING = "CHATS_LOADING";
export const CHATS_ERROR = "CHATS_ERROR";
export const SET_ACTIVE = "SET_ACTIVE";
export const READY_TO_SEND_MSG = "READY_TO_SEND_MSG";
export const MSG_SEND_STATUS = "MSG_SEND_STATUS";
export const MSG_RECEIVED = "MSG_RECEIVED";
export const SET_BLOCKED_BY = "SET_BLOCKED_BY";
export const INITIALISE_CHAT = "INITIALISE_CHAT";
export const REMOVE_CONTACT_INFO = "REMOVE_CONTACT_INFO";
export const ADD_MEMBER_CONTACT_INFO = "ADD_MEMBER_CONTACT_INFO";

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

export const setActive = (payload, isPrivate = true, _id = null) => {
  return {
    type: SET_ACTIVE,
    payload,
    isPrivate,
    _id,
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

export const updateMessageReceived = (chatId, payload) => {
  return {
    type: MSG_RECEIVED,
    payload,
    chatId,
  };
};

export const setBlockedBy = (chatId, blockedBy) => {
  return {
    type: SET_BLOCKED_BY,
    blockedBy,
    chatId,
  };
};

export const initialiseChat = () => {
  return {
    type: INITIALISE_CHAT,
  };
};

export const removeChatContactInfo = (chatId, email) => {
  return {
    type: REMOVE_CONTACT_INFO,
    payload: {
      chatId,
      email,
    },
  };
};

export const addMemberContactInfo = (chatId, data) => {
  return {
    type: ADD_MEMBER_CONTACT_INFO,
    payload: {
      chatId,
      data,
    },
  };
};
