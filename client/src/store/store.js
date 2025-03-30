import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import registerReducer from '../features/auth/registerSlice';

const persistConfig = {
  key: 'register',
  storage,
};

const persistedRegisterReducer = persistReducer(persistConfig, registerReducer);

export const store = configureStore({
  reducer: {
    register: persistedRegisterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
