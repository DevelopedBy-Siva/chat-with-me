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
  KICK_FROM_GROUP,
  LAST_MSG_AND_TMSTP,
  IS_ONLINE,
  REMOVE_MEMBER,
} from "../actions/ContactActions";

const initialState = {
  loading: true,
  contacts: [],
  groups: [],
  isOnline: [],
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
      const contactExists = newContacts.findIndex(
        (i) => i.email === payload.email
      );
      if (contactExists === -1) newContacts.unshift(payload);
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
      const newGroupIndex = newGroups.findIndex(
        (i) => i.chatId === payload.chatId
      );
      if (newGroupIndex === -1) newGroups.unshift(payload);
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
      afterNicknameUpdate[index].inContact = true;
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

      const memeberAlreadyExists = groupAfterNewContact[
        groupToAddIndex
      ].members.findIndex((i) => i.email === payload.contact.email);

      if (memeberAlreadyExists === -1)
        groupAfterNewContact[groupToAddIndex].members.push(payload.contact);

      return {
        ...state,
        groups: [...groupAfterNewContact],
      };
    case KICK_FROM_GROUP:
      const groupIndexToKick = state.groups.findIndex(
        (i) => i.chatId === payload.chatId
      );
      if (groupIndexToKick === -1)
        return {
          ...state,
        };
      const groupToKick = [...state.groups];
      const contactToKickIndex = groupToKick[
        groupIndexToKick
      ].members.findIndex((i) => i.email === payload.contact);
      if (contactToKickIndex === -1)
        return {
          ...state,
        };
      groupToKick[groupIndexToKick].members.splice(contactToKickIndex, 1);
      return {
        ...state,
        groups: [...groupToKick],
      };
    case LAST_MSG_AND_TMSTP:
      const { isPrivate, lastMsg, lastMsgTstmp, lastMsgId, chatId } = payload;
      const contacts = [...state.contacts];
      const groups = [...state.groups];
      if (isPrivate) {
        const index = contacts.findIndex((i) => i.chatId === chatId);
        if (index !== -1) {
          contacts[index].lastMessage["message"] = lastMsg;
          contacts[index].lastMessage["timestamp"] = lastMsgTstmp;
          contacts[index].lastMessage["uuid"] = lastMsgId;
        }
      } else {
        const index = groups.findIndex((i) => i.chatId === chatId);
        if (index !== -1) {
          groups[index].lastMessage["message"] = lastMsg;
          groups[index].lastMessage["timestamp"] = lastMsgTstmp;
          groups[index].lastMessage["uuid"] = lastMsgId;
        }
      }
      return {
        ...state,
        groups,
        contacts,
      };
    case IS_ONLINE:
      return {
        ...state,
        isOnline: [...payload],
      };
    case REMOVE_MEMBER:
      let groupsAfterRemovingMember = [...state.groups];
      const groupIndexToRemoveMember = groupsAfterRemovingMember.findIndex(
        (i) => i.chatId === payload.chatId
      );
      if (groupIndexToRemoveMember !== -1) {
        let members =
          groupsAfterRemovingMember[groupIndexToRemoveMember].members;
        if (Array.isArray(members)) {
          members = members.filter((m) => m.email !== payload.email);
          groupsAfterRemovingMember[groupIndexToRemoveMember].members = [
            ...members,
          ];
          if (payload.admin)
            groupsAfterRemovingMember[groupIndexToRemoveMember].admin =
              payload.admin;
        }
      }
      return { ...state, groups: [...groupsAfterRemovingMember] };
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
