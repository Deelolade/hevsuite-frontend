import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import registerReducer from '../features/auth/registerSlice';
import newsReducer from '../features/newsSlice';
import eventReducer from '../features/eventSlice';
const persistConfig = {
  key: 'register',
  storage,
};

const persistedRegisterReducer = persistReducer(persistConfig, registerReducer);

export const store = configureStore({
  reducer: {
    register: persistedRegisterReducer,
    news: newsReducer,
    events: eventReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
