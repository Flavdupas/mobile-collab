import { configureStore } from '@reduxjs/toolkit';
import register from './register/register';
import forgot from './forgot/forgot';
import login from './login/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import connected from './connected/connected';

const loginPersistConfig = {
  key: 'login',
  storage: AsyncStorage,
};

const persistedLoginReducer = persistReducer(loginPersistConfig, login);

const store = configureStore({
  reducer: {
    register: register,
    forgot: forgot,
    login: persistedLoginReducer,
    connected:connected,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>
