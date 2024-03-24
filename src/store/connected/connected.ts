import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BasicService, ServiceInterface } from "../../data/interface/Service";
import { Direct, Groupe } from "../../data/interface/Group";

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
  notifications:
    | {
        id_notification: number;
        id_etudiant: number;
        id_message: string | null;
        id_post: number | null;
        id_groupe: number | null;
        titre: string;
        date_notification: Date | null;
      }[]
    | null;
  fetchData: { pp: string | null; themes: ThemeInterface[] | null };
  data: { currentService: ServiceInterface | null };
  serviceCreate: BasicService;
  direct: Direct | null;
  groupe: Groupe | null;
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
  fetchData: {
    pp: null,
    themes: null,
  },
  data: { currentService: null },
  serviceCreate: {
    title: null,
    description: null,
    type: 0,
    price: null,
    id_theme: null,
    dateDebut: null,
    dateFin: null,
  },
  direct:null,
  groupe:null,
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
    updatePersonnalPhoto: (state, action: PayloadAction<string>) => {
      state.fetchData.pp = action.payload;
    },
    updateThemes: (state, action: PayloadAction<ThemeInterface[]>) => {
      state.fetchData.themes = action.payload;
    },
    updateCurrentService: (state, action: PayloadAction<ServiceInterface>) => {
      state.data.currentService = action.payload;
    },
    updateServiceCreate: (
      state,
      action: PayloadAction<{
        title: string | null;
        description: string | null;
        type: 0 | 1;
        price: number | null;
        id_theme: number | null;
        dateDebut: number | null;
        dateFin: number | null;
      }>
    ) => {
      state.serviceCreate = action.payload;
    },
    updateDirect: (state, action: PayloadAction<Direct | null>) => {
      state.direct = action.payload;
    },
     updateGroupe: (state, action: PayloadAction<Groupe | null>) => {
      state.groupe = action.payload;
    }
  },
});

export const {
  updateUtilisateur,
  updateEtudiant,
  updateNotifications,
  updatePersonnalPhoto,
  updateThemes,
  updateCurrentService,
  updateServiceCreate,
  updateDirect,
  updateGroupe
} = connectedSlice.actions;
export default connectedSlice.reducer;
