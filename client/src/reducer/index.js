import { useReducer } from "./userReducer";
import { combineReducers } from "redux";
import { searchReducer } from "./searchReducer";
import { cartReducer } from "./cartReducer";

const rootReducer = combineReducers({
  user: useReducer,
  search: searchReducer,
  cart: cartReducer,
});

export default rootReducer;
