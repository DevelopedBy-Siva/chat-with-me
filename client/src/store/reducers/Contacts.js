import axios from "../../api/axios";
import {
  ADD_NEW_CONTACT,
  contactsError,
  contactsLoading,
  CONTACTS_ERROR,
  CONTACTS_LOADING,
  getContacts,
  GET_CONTACTS,
} from "../actions/ContactActions";

const initialState = {
  loading: true,
  contacts: [],
  error: null,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CONTACTS_LOADING:
      return { ...state, loading: true, error: null };
    case CONTACTS_ERROR:
      return { ...state, loading: false, error: payload };
    case GET_CONTACTS:
      return { ...state, contacts: [...payload], loading: false, error: null };
    case ADD_NEW_CONTACT:
      const newContacts = [...state.contacts];
      newContacts.unshift(payload);
      return {
        ...state,
        contacts: [...newContacts],
      };
    default:
      return state;
  }
};

export default reducer;

export const initializeContacts = () => {
  return (dispatch) => {
    dispatch(contactsLoading());
    axios
      .get("/user/contacts")
      .then(({ data }) => {
        dispatch(getContacts(data));
      })
      .catch((err) => {
        dispatch(contactsError(err));
      });
  };
};
