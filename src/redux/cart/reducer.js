import { ADDITEM, REMOVEITEM } from "./action";

export const initialState = {
  add: 0,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADDITEM:
      return {
        ...state,
        add: state.add + action.items,
      };
    case REMOVEITEM:
      return {
        ...state,
        add: state.add - action.items,
      };
    default:
      return {
        ...state,
      };
  }
}
