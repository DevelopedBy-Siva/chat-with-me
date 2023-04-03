export const GET_CONTACTS = "GET_CONTACTS";
export const CONTACTS_LOADING = "CONTACTS_LOADING";
export const CONTACTS_ERROR = "CONTACTS_ERROR";
export const ADD_NEW_CONTACT = "ADD_NEW_CONTACT";

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
