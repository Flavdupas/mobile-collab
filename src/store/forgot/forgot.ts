import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State {
  email: string | null;
  token: string | null;
}

const initialState: State = {
  email: null,
  token: null,
};

const forgotSlice = createSlice({
  name: "forgot",
  initialState,
  reducers: {
    updateEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { updateEmail, updateToken } = forgotSlice.actions;
export default forgotSlice.reducer;
