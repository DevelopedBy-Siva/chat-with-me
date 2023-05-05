import {
  CHANGE_AVATAR,
  CHANGE_DESCRIPTION,
  CHANGE_USER_NAME,
  ONETIME_INFO,
  SET_USER,
} from "../actions/UserActions";

const initialState = {
  details: {
    name: "",
    email: "",
    avatarId: "",
    description: "",
  },
  oneTimeInfo: false,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER:
      let data = {
        ...state,
      };
      data.details = { ...payload.data };

      return {
        ...data,
      };

    case ONETIME_INFO:
      return { ...state, oneTimeInfo: payload };

    case CHANGE_USER_NAME:
      const changeUsernameData = {
        ...state.details,
      };
      changeUsernameData.name = payload;
      return {
        ...state,
        details: { ...changeUsernameData },
      };

    case CHANGE_DESCRIPTION:
      const changeDecriptionData = {
        ...state.details,
      };
      changeDecriptionData.description = payload;
      return {
        ...state,
        details: { ...changeDecriptionData },
      };

    case CHANGE_AVATAR:
      const changeAvatarData = {
        ...state.details,
      };
      changeAvatarData.avatarId = payload;
      return {
        ...state,
        details: { ...changeAvatarData },
      };

    default:
      return state;
  }
};

export default reducer;
