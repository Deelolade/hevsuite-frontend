import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import userReducer from "./users/userSlice";
import askReducer from "./ask/askSlice";
import eventReducer from './events/eventSlice';
import statisticsReducer from './statistics/statisticsSlice';
import newsReducer from './news/newsSlice';
import evidenceReducer from "./evidence/evidenceSlice";
import paymentReducer from './payment/paymentSlice';
import transactionReducer from './transactions/transactionSlice';
import pricingReducer from './pricing/pricingSlice';
import adminReducer from './admins/adminSlice';
import adminProfileReducer from './adminProfile/adminProfileSlice';
import helpReducer from './help/helpSlice';
import cardReducer from "./cards/cardSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer.users,
    adminUsers: userReducer.adminUsers,
    ask: askReducer,
    events: eventReducer,
    statistics: statisticsReducer,
    news: newsReducer,
    evidence: evidenceReducer,
    payment: paymentReducer,
    transactions: transactionReducer,
    pricing: pricingReducer,
    admins: adminReducer,
    adminProfile: adminProfileReducer,
    help: helpReducer,
    cards: cardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
