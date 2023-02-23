import axios from "../../api/axios";
import {
  chatsError,
  chatsLoading,
  CHATS_ERROR,
  CHATS_LOADING,
  getChats,
  GET_CHATS,
  SET_ACTIVE,
} from "../actions/ChatActions";

const initialState = {
  loading: true,
  active: null,
  chats: null,
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
      const { data, id } = payload;
      return {
        ...state,
        loading: false,
        error: null,
        active: id,
        chats: data,
      };
    case SET_ACTIVE:
      return {
        ...state,
        error: null,
        active: payload,
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
      .get(`https://apigenerator.dronahq.com/api/ahoJbBde/chat/${id}`)
      .then(({ data }) => {
        dispatch(getChats(id, data));
      })
      .catch((err) => {
        dispatch(chatsError(err));
      });
  };
};
