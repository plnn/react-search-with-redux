import { SET_VALUE } from "./state-keys";

const INITIAL_STATE = {
  value: ""
};
export const setValue = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_VALUE:
      return { ...state, value: action.payload };

    default:
      return state;
  }
};
