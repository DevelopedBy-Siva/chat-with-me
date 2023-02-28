import moment from "moment";

import axios from "../../api/axios";
import {
  chatsError,
  chatsLoading,
  CHATS_ERROR,
  CHATS_LOADING,
  getChats,
  GET_CHATS,
  MSG_SEND_STATUS,
  readyToSendMsg,
  READY_TO_SEND_MSG,
  SET_ACTIVE,
  updateMessageSendStatus,
} from "../actions/ChatActions";
import { sortAndGroupMsgs } from "../../utils/DateTime";

const initialState = {
  loading: true,
  active: null,
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
      return {
        ...state,
        error: payload,
        loading: false,
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
        active: payload,
      };
    case READY_TO_SEND_MSG:
      const { data: details, chatId, currentDate: today } = payload;
      const conversations = { ...state.chats };
      const chat = conversations[chatId];

      if (chat && chat.messages) {
        const key = chat.messages[today];
        if (key) chat.messages[today].push({ ...details, isSent: false });
        else chat.messages[today] = [{ ...details, isSent: false }];
      }
      console.log(conversations);
      return {
        ...state,
        chats: { ...conversations },
      };
    case MSG_SEND_STATUS:
      const { msgId, status, chatId: chat_id, dateGroup } = payload;
      const convs = { ...state.chats };
      const con = convs[chat_id];

      if (con && con.messages && con.messages[dateGroup]) {
        con.messages[dateGroup].forEach((msg) => {
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
      .get(`https://apigenerator.dronahq.com/api/lZkfxOpO/chat/${id}`)
      .then(({ data }) => {
        dispatch(getChats(id, data));
      })
      .catch((err) => {
        dispatch(chatsError(err));
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

export function sendMessage(data, chatId) {
  const currentDate = moment().format("LL");
  const { msgId } = data;

  return (dispatch) => {
    dispatch(readyToSendMsg(data, chatId, currentDate));
    wait(() =>
      dispatch(updateMessageSendStatus(chatId, msgId, true, currentDate))
    );
  };
}

function wait(callback) {
  return new Promise((resolve) => {
    setTimeout(() => {
      callback();
      resolve();
    }, 5000);
  });
}
