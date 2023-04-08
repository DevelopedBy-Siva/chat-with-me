import axios from "../../api/axios";
import {
  ADD_NEW_CONTACT,
  BLOCK_CONTACT,
  contactsError,
  contactsLoading,
  CONTACTS_ERROR,
  CONTACTS_LOADING,
  CREATE_GROUP,
  DELETE_CONTACT,
  getContacts,
  GET_CONTACTS,
  UNBLOCK_CONTACT,
} from "../actions/ContactActions";

const initialState = {
  loading: true,
  contacts: [],
  groups: [],
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
      const allContacts = [...payload.contacts];
      const allGroups = [...payload.groups];
      return {
        ...state,
        contacts: [...allContacts],
        groups: [...allGroups],
        loading: false,
        error: null,
      };
    case ADD_NEW_CONTACT:
      const newContacts = [...state.contacts];
      newContacts.unshift(payload);
      return {
        ...state,
        contacts: [...newContacts],
      };
    case BLOCK_CONTACT:
      const blockIndex = state.contacts.findIndex(
        (item) => item.email === payload
      );
      if (blockIndex === -1) return { ...state };
      const afterBlocked = [...state.contacts];
      afterBlocked[blockIndex].isBlocked = true;
      return {
        ...state,
        contacts: [...afterBlocked],
      };
    case UNBLOCK_CONTACT:
      const unblockIndex = state.contacts.findIndex(
        (item) => item.email === payload
      );
      if (unblockIndex === -1) return { ...state };
      const afterUnBlocked = [...state.contacts];
      afterUnBlocked[unblockIndex].isBlocked = false;
      return {
        ...state,
        contacts: [...afterUnBlocked],
      };
    case DELETE_CONTACT:
      const deleteIndex = state.contacts.findIndex(
        (item) => item.email === payload
      );
      if (deleteIndex === -1) return { ...state };
      const afterDelete = [...state.contacts];
      afterDelete.splice(deleteIndex, 1);
      return {
        ...state,
        contacts: [...afterDelete],
      };
    case CREATE_GROUP:
      const newGroups = [...state.groups];
      newGroups.unshift(payload);
      return {
        ...state,
        groups: newGroups,
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
