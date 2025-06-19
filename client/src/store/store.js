import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import registerReducer from "../features/auth/registerSlice";
import authReducer from "../features/auth/authSlice";
import newsReducer from "../features/newsSlice";
import eventReducer from "../features/eventSlice";
import askReducer from "../features/askSlice";
import notificationReducer from "../features/notificationSlice";
import landingPageReducer from "../features/landingPageSlice";
import generalSettingReducer from "../features/generalSettingSlice";
import footerReducer from "../features/footerSlice";
import menusReducer from "../features/menuSlice";
import clubCardReducer from "../features/clubCardSlice";
import supportRequestReducer from "../features/supportRequestSlice";
// Persist configuration for the register slice
// const registerPersistConfig = {
//   key: 'register',
//   storage,
// };

// // Persist configuration for the auth slice
// const authPersistConfig = {
//   key: 'auth',
//   storage,
//   whitelist: ['isAuthenticated']
// };

const CURRENT_STORE_VERSION = 0;

/**@type { import("redux-persist").PersistConfig } */
const persistConfig = {
  key: "root",
  storage,
  version: CURRENT_STORE_VERSION,
  whitelist: ["auth", "register"], // optional: persist only selected slices
  migrate: (state, version) => {
    if (version !== CURRENT_STORE_VERSION) return undefined; // reset everything
    return Promise.resolve(state); // return peristed-state
  },
};

// Create persisted reducers
// const persistedRegisterReducer = persistReducer(registerPersistConfig, registerReducer);
// const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const rootReducer = combineReducers({
  register: registerReducer, // Persisted register slice
  auth: authReducer, // Persisted auth slice
  news: newsReducer,
  events: eventReducer,
  ask: askReducer,
  notifications: notificationReducer,
  landingPage: landingPageReducer,
  generalSettings: generalSettingReducer,
  footer: footerReducer,
  menus: menusReducer,
  clubCard: clubCardReducer,
  supportRequest: supportRequestReducer,
});

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

// import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import registerReducer from '../features/auth/registerSlice';
// import newsReducer from '../features/newsSlice';
// import eventReducer from '../features/eventSlice';
// const persistConfig = {
//   key: 'register',
//   storage,
// };

// const persistedRegisterReducer = persistReducer(persistConfig, registerReducer);

// export const store = configureStore({
//   reducer: {
//     register: persistedRegisterReducer,
//     news: newsReducer,
//     events: eventReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// export const persistor = persistStore(store);
