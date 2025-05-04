import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import registerReducer from '../features/auth/registerSlice';
import authReducer from '../features/auth/authSlice';
import newsReducer from '../features/newsSlice';
import eventReducer from '../features/eventSlice';

// Persist configuration for the register slice
const registerPersistConfig = {
  key: 'register',
  storage,
};

// Persist configuration for the auth slice
const authPersistConfig = {
  key: 'auth',
  storage,
};

// Create persisted reducers
const persistedRegisterReducer = persistReducer(registerPersistConfig, registerReducer);
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    register: persistedRegisterReducer, // Persisted register slice
    auth: persistedAuthReducer,        // Persisted auth slice
    news: newsReducer,
    events: eventReducer,
  },
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

