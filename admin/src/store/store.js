import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import userReducer from "./users/userSlice";
import cardReducer from "./cards/cardSlice";
import askReducer from "./ask/askSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    card: cardReducer,
    ask: askReducer,
  },
});
