import axios from "../../api/axios";
import {
  chatsError,
  chatsLoading,
  CHATS_ERROR,
  CHATS_LOADING,
} from "../actions/ChatActions";

const initialState = {
  loading: true,
  active: null,
  chats: new Map(),
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
    default:
      return state;
  }
};

export default reducer;

export const fetchChats = (id) => {
  return (dispatch) => {
    dispatch(chatsLoading());
    axios
      .get("")
      .then(() => {})
      .catch((err) => {
        dispatch(chatsError(err));
      });
  };
};
