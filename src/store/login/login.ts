import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State {
  token: string | null;
}

const initialState: State = {
  token:null
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    updateToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
  },
});

export const { updateToken } = loginSlice.actions;
export default loginSlice.reducer;
