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
import permissionReducer from "./permission/permissionSlice"
import activityReducer from "./activities/activitySlice"
import settingReducer from "./setting/settingSlice"
import socialMediaReducer from "./socialMedia/socialMediaSlice"
import cmsReducer from "./cms/cmsSlice"
import pageReducer from "./page/pageSlice";
import notificationReducer from './notifications/notificationSlice';
import financeReducer from './finance/financeSlice'
import supportReducer from "./support/supportSlice";
import affiliateReducer from './affiliate/affiliateSlice';

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
    permissions: permissionReducer,
    activities: activityReducer,
    settings: settingReducer,
    socialMedia: socialMediaReducer,
    cms: cmsReducer,
    pages: pageReducer,
    notifications: notificationReducer,
    finance: financeReducer,
    support: supportReducer,
    affiliate: affiliateReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
