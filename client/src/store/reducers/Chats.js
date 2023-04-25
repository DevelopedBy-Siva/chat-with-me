import axios from "../../api/axios";
import {
  chatsError,
  chatsLoading,
  CHATS_ERROR,
  CHATS_LOADING,
  getChats,
  GET_CHATS,
  MSG_SEND_STATUS,
  READY_TO_SEND_MSG,
  SET_ACTIVE,
  MSG_RECEIVED,
  SET_BLOCKED_BY,
} from "../actions/ChatActions";
import { getDateTime_LL_format, sortAndGroupMsgs } from "../../utils/DateTime";
import toast from "../../components/Toast";

const initialState = {
  loading: true,
  active: {
    val: null,
    isPrivate: true,
    _id: null,
  },
  chats: {},
  error: null,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHATS_LOADING:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case CHATS_ERROR:
      const { errorId, isPrivate } = payload;
      const newChats = { ...state.chats };
      newChats[errorId] = {
        id: errorId,
        isPrivate,
        messages: {},
      };

      return {
        ...state,
        error: null,
        loading: false,
        chats: { ...newChats },
      };
    case GET_CHATS:
      const { data = {}, id } = payload;
      const chats = { ...state.chats };
      chats[id] = { ...data, messages: sortAndGroupMsgs(data.messages) };

      return { ...state, loading: false, error: null, chats };
    case SET_ACTIVE:
      return {
        ...state,
        error: null,
        active: {
          val: payload,
          isPrivate: action.isPrivate,
          _id: action._id,
        },
      };
    case READY_TO_SEND_MSG:
      const { data: details, chatId, currentDate: today } = payload;
      const conversations = { ...state.chats };
      const chat = conversations[chatId];
      const dateTime_LL = getDateTime_LL_format(today);

      if (chat && chat.messages) {
        const key = chat.messages[dateTime_LL];
        if (key)
          chat.messages[dateTime_LL].unshift({ ...details, isSent: false });
        else chat.messages[dateTime_LL] = [{ ...details, isSent: false }];
      }
      return {
        ...state,
        chats: { ...conversations },
      };
    case MSG_SEND_STATUS:
      const { msgId, status, chatId: chat_id, dateGroup } = payload;
      const convs = { ...state.chats };
      const con = convs[chat_id];
      const dateTime_LL_key = getDateTime_LL_format(dateGroup);

      if (con && con.messages && con.messages[dateTime_LL_key]) {
        con.messages[dateTime_LL_key].forEach((msg) => {
          if (msg.msgId === msgId) {
            msg.isSent = status;
            return;
          }
        });
      }
      return {
        ...state,
        chats: convs,
      };
    case MSG_RECEIVED:
      const updatedChats = { ...state.chats };
      const specific_updatedChat = updatedChats[action.chatId];

      if (specific_updatedChat && specific_updatedChat.messages) {
        const receivedMsg_dateTime_LL_key = getDateTime_LL_format(
          payload.createdAt
        );

        const specific_updatedChatKey =
          specific_updatedChat.messages[receivedMsg_dateTime_LL_key];

        if (specific_updatedChatKey)
          specific_updatedChat.messages[receivedMsg_dateTime_LL_key].unshift({
            ...payload,
            isSent: true,
          });
        else
          specific_updatedChat.messages[receivedMsg_dateTime_LL_key] = [
            { ...payload, isSent: true },
          ];
      }

      return {
        ...state,
        chats: { ...updatedChats },
      };
    case SET_BLOCKED_BY:
      const updateBlockedChats = { ...state.chats };
      const chatToSetBlocked = updateBlockedChats[action.chatId];
      if (chatToSetBlocked) chatToSetBlocked.blockedBy = action.blockedBy;
      return {
        ...state,
        chats: { ...updateBlockedChats },
      };
    default:
      return state;
  }
};

export default reducer;

export const fetchChats = (id) => {
  return (dispatch, getState) => {
    if (dontFetchChats(getState, id)) return;

    dispatch(chatsLoading());
    axios
      .get(`/chat/${id}`)
      .then(({ data }) => {
        dispatch(getChats(id, data));
      })
      .catch(() => {
        const { contacts } = getState();
        let isPrivate = false;
        contacts.contacts.forEach((val) => {
          if (val.id === id) {
            isPrivate = val.isPrivate;
            return;
          }
        });
        dispatch(chatsError(id, isPrivate));
        toast.error("Something weent wrong. Failed to retrieve chat");
      });
  };
};

function dontFetchChats(state, id) {
  const chatState = state().chats;
  if (!chatState) return false;

  const chats = chatState.chats;
  if (!chats || !chats[id]) return false;
  return true;
}
