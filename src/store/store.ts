import { configureStore } from '@reduxjs/toolkit';
import register from './register/register';
import forgot from './forgot/forgot';

const store = configureStore({
  reducer: {
    register: register,
    forgot:forgot,
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>
