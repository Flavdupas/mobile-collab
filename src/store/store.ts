import { configureStore } from '@reduxjs/toolkit';
import register from './register/register';
import forgot from './forgot/forgot';
import login from './login/login';

const store = configureStore({
  reducer: {
    register: register,
    forgot: forgot,
    login: login,
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>
