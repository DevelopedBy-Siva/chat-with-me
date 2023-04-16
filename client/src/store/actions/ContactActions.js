export const GET_CONTACTS = "GET_CONTACTS";
export const CONTACTS_LOADING = "CONTACTS_LOADING";
export const CONTACTS_ERROR = "CONTACTS_ERROR";
export const ADD_NEW_CONTACT = "ADD_NEW_CONTACT";
export const BLOCK_CONTACT = "BLOCK_CONTACT";
export const UNBLOCK_CONTACT = "UNBLOCK_CONTACT";
export const DELETE_CONTACT = "DELETE_CONTACT";
export const CREATE_GROUP = "CREATE_GROUP";
export const REMOVE_GROUP = "REMOVE_GROUP";
export const CHANGE_NICKNAME = "CHANGE_NICKNAME";
export const ADD_TO_GROUP = "ADD_TO_GROUP";
export const KICK_FROM_GROUP = "KICK_FROM_GROUP";

export const getContacts = (payload) => {
  return {
    type: GET_CONTACTS,
    payload,
  };
};

export const contactsLoading = () => {
  return {
    type: CONTACTS_LOADING,
  };
};

export const contactsError = (payload) => {
  return {
    type: CONTACTS_ERROR,
    payload,
  };
};

export const addNewContact = (payload) => {
  return {
    type: ADD_NEW_CONTACT,
    payload,
  };
};

export const deleteUserContact = (payload) => {
  return {
    type: DELETE_CONTACT,
    payload,
  };
};

export const blockUserContact = (payload) => {
  return {
    type: BLOCK_CONTACT,
    payload,
  };
};

export const unBlockUserContact = (payload) => {
  return {
    type: UNBLOCK_CONTACT,
    payload,
  };
};

export const createUserGroup = (payload) => {
  return {
    type: CREATE_GROUP,
    payload,
  };
};

export const removeUserGroup = (payload) => {
  return {
    type: REMOVE_GROUP,
    payload,
  };
};

export const changeContactNickname = (payload) => {
  return {
    type: CHANGE_NICKNAME,
    payload,
  };
};

export const addContactToGroup = (chatId, contact) => {
  return {
    type: ADD_TO_GROUP,
    payload: {
      chatId,
      contact,
    },
  };
};

export const kickContactFromGroup = (chatId, contact) => {
  return {
    type: KICK_FROM_GROUP,
    payload: {
      chatId,
      contact,
    },
  };
};
