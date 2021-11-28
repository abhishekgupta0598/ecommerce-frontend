import { OPEN, CLOSE, LOGIN, LOGOUT } from "./action";

export let initialState = {
  open: false,
  login: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case OPEN:
      return {
        ...state,
        open: true,
      };
    case CLOSE:
      return {
        ...state,
        open: false,
      };
    case LOGIN:
      return {
        ...state,
        login: true,
      };
    case LOGOUT:
      return {
        ...state,
        login: false,
      };
    default:
      return {
        ...state,
      };
  }
}
