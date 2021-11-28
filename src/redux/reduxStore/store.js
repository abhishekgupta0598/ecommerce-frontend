import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import formReducer from "../loginForm/reducer";
import cartReducer from "../cart/reducer";

const rootReducer = combineReducers({
  form: formReducer,
  cart: cartReducer,
});

export const store = createStore(rootReducer, applyMiddleware(logger));
