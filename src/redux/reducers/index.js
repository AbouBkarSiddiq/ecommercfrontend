import { combineReducers } from "redux";
import adminReducer from "./admin";
import authReducer from "./auth";
import storageReducer from "./storage";

const rootReducer = combineReducers({
  adminReducer,
  authReducer,
  storageReducer,
});

export default rootReducer;