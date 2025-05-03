import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import userReducer from "./users/userSlice";
import cardReducer from "./cards/cardSlice";
import askReducer from "./ask/askSlice";
import statisticsReducer from "./statistics/statisticsSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer.users,
    card: cardReducer,
    ask: askReducer,
    statistics: statisticsReducer,
  },
});
