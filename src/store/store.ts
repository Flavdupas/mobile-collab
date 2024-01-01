import { configureStore } from '@reduxjs/toolkit';
import register from './register/register';

const store = configureStore({
  reducer: {
    register: register,
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>
