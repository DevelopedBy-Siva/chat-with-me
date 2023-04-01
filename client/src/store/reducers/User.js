import { ONETIME_INFO, SET_USER } from "../actions/UserActions";

const initialState = {
  details: {},
  oneTimeInfo: false,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER:
      return {
        ...state,
        details: payload.data,
        oneTimeInfo: payload.oneTimeInfo,
      };
    case ONETIME_INFO:
      return { ...state, oneTimeInfo: payload };
    default:
      return state;
  }
};

export default reducer;
