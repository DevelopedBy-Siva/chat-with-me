import { ONETIME_INFO, SET_USER } from "../actions/UserActions";

const initialState = {
  details: {},
  oneTimeInfo: true,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER:
      let data = {
        ...state,
      };
      data.details = { ...payload.data };

      if (payload.oneTimeInfo !== undefined)
        data.oneTimeInfo = payload.oneTimeInfo;

      return {
        ...data,
      };
    case ONETIME_INFO:
      return { ...state, oneTimeInfo: payload };
    default:
      return state;
  }
};

export default reducer;
