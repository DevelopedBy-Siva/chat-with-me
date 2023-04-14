import axios from "../../api/axios";
import {
  ADD_NEW_CONTACT,
  BLOCK_CONTACT,
  CHANGE_NICKNAME,
  contactsError,
  contactsLoading,
  CONTACTS_ERROR,
  CONTACTS_LOADING,
  CREATE_GROUP,
  DELETE_CONTACT,
  getContacts,
  GET_CONTACTS,
  REMOVE_GROUP,
  UNBLOCK_CONTACT,
  ADD_TO_GROUP,
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
    case REMOVE_GROUP:
      const afterRemove = [...state.groups];
      const groupIndex = afterRemove.findIndex((i) => i.chatId === payload);
      if (groupIndex === -1) return { ...state };
      afterRemove.splice(groupIndex, 1);
      return {
        ...state,
        groups: [...afterRemove],
      };
    case CHANGE_NICKNAME:
      const index = state.contacts.findIndex((i) => i.email === payload.email);
      if (index === -1) return { ...state };
      const afterNicknameUpdate = [...state.contacts];
      afterNicknameUpdate[index].nickname = payload.nickname;
      return {
        ...state,
        contacts: afterNicknameUpdate,
      };
    case ADD_TO_GROUP:
      const groupAfterNewContact = [...state.groups];
      const groupToAddIndex = groupAfterNewContact.findIndex(
        (i) => i.chatId === payload.chatId
      );
      if (groupToAddIndex === -1) return { ...state };

      groupAfterNewContact[groupToAddIndex].members.push(payload.contact);

      return {
        ...state,
        groups: [...groupAfterNewContact],
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
