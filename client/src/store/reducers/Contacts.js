import axios from "../../api/axios";
import {
  contactsError,
  contactsLoading,
  CONTACTS_ERROR,
  CONTACTS_LOADING,
  getContacts,
  GET_CONTACTS,
  ONETIME_INFO,
} from "../actions/ContactActions";

const initialState = {
  loading: true,
  contacts: [],
  oneTimeInfo: false,
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
    case ONETIME_INFO:
      return { ...state, oneTimeInfo: payload };
    default:
      return state;
  }
};

export default reducer;

export const initializeContacts = () => {
  return (dispatch) => {
    dispatch(contactsLoading());
    axios
      .get("https://apigenerator.dronahq.com/api/2zuiq3iT/contacts")
      .then(({ data }) => {
        dispatch(getContacts(data));
      })
      .catch((err) => {
        dispatch(contactsError(err));
      });
  };
};
