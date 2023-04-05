export const GET_CONTACTS = "GET_CONTACTS";
export const CONTACTS_LOADING = "CONTACTS_LOADING";
export const CONTACTS_ERROR = "CONTACTS_ERROR";
export const ADD_NEW_CONTACT = "ADD_NEW_CONTACT";
export const BLOCK_CONTACT = "BLOCK_CONTACT";
export const DELETE_CONTACT = "DELETE_CONTACT";

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
