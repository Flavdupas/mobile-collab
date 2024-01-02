import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State {
  email: string | null;
  password: string | null;
}

const initialState: State = {
  email: null,
  password: null,
};

const forgotSlice = createSlice({
  name: "forgot",
  initialState,
  reducers: {
    updateEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    updatePassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
});

export const { updateEmail, updatePassword } = forgotSlice.actions;
export default forgotSlice.reducer;
