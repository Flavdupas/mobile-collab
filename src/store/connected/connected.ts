import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State {
  utilisateur: {
    id_utilisateur: number | null;
    email: string | null;
    path_pp: string | null;
  };
  etudiant: {
    credit: number | null;
    nom: string | null;
    prenom: string | null;
    telephone: string | null;
    date_naissance: string | null;
    rencontre: boolean | null;
  };
  notifications: {
        id_notification: number;
        id_etudiant: number;
        id_message: string | null;
        id_post: number | null;
        id_groupe: number | null;
        titre: string;
        date_notification: Date | null;
      }[]
    | null;
}

const initialState: State = {
  utilisateur: {
    id_utilisateur: null,
    email: null,
    path_pp: null,
  },
  etudiant: {
    credit: null,
    nom: null,
    prenom: null,
    telephone: null,
    date_naissance: null,
    rencontre: null,
  },
  notifications: null,
};

const connectedSlice = createSlice({
  name: "connected",
  initialState,
  reducers: {
    updateUtilisateur: (
      state,
      action: PayloadAction<{
        id_utilisateur: number | null;
        email: string | null;
        path_pp: string | null;
      }>
    ) => {
      state.utilisateur = action.payload;
    },
    updateEtudiant: (
      state,
      action: PayloadAction<{
        credit: number | null;
        nom: string | null;
        prenom: string | null;
        telephone: string | null;
        date_naissance: string | null;
        rencontre: boolean | null;
      }>
    ) => {
      state.etudiant = action.payload;
    },
    updateNotifications: (
      state,
      action: PayloadAction<
        {
          id_notification: number;
          id_etudiant: number;
          id_message: string | null;
          id_post: number | null;
          id_groupe: number | null;
          titre: string;
          date_notification: Date | null;
        }[]
      >
    ) => {
      state.notifications = action.payload;
    },
  },
});

export const { updateUtilisateur, updateEtudiant, updateNotifications } = connectedSlice.actions;
export default connectedSlice.reducer;
