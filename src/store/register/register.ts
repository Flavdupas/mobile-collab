import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State {
  email:string | null,
  birthday:number | null,
  phone:number | null,
  meet:boolean,
  themes: number[] | null,
  carteEtudiante: string | null,
  password:string | null,
  token:string | null,
}

const initialState: State = {
  email:null,
  birthday:null,
  phone:null,
  meet:true,
  themes: null,
  carteEtudiante:null,
  password:null,
  token:null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    updateEmail: (state,action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    updateBirthday: (state,action: PayloadAction<number>) => {
      state.birthday = action.payload;
    },
    updatePhone: (state,action: PayloadAction<number>) => {
        state.phone = action.payload;
    },
    updateMeet: (state, action: PayloadAction<boolean>) => {
        state.meet = action.payload;
    },
    updateThemes: (state, action: PayloadAction<number[]>) => {
        state.themes = action.payload;
    },
    updateCarteEtudiante: (state,action: PayloadAction<string>) => {
        state.carteEtudiante = action.payload;
    },
    updatePassword: (state,action: PayloadAction<string>) => {
        state.password = action.payload;
    },
    updateToken: (state,action: PayloadAction<string>) => {
        state.token = action.payload;
    },
  },
});

export const { updateEmail,updateBirthday,updatePhone,updateMeet,updateThemes,updateCarteEtudiante,updatePassword,updateToken } = registerSlice.actions;
export default registerSlice.reducer;