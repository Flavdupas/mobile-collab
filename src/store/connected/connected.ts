import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BasicService, ServiceInterface } from "../../data/interface/Service";
import { Direct, Groupe } from "../../data/interface/Group";
import { Role } from "../../data/interface/Role";

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
    roles: Role[]
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
  loadMessage: boolean;
  loadPost: boolean;
  currentPost: PostInterface | null;
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
    roles:[]
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
  loadMessage:true,
  loadPost:true,
  currentPost: null,
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
        roles:Role[]
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
    },
    updateLoadMessage: (state, action: PayloadAction<boolean>) => {
      state.loadMessage = action.payload
    },
    updateLoadPost: (state, action: PayloadAction<boolean>) => {
      state.loadPost = action.payload
    },
    updateCurrentPost: (state, action: PayloadAction<PostInterface>) => {
      state.currentPost = action.payload
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
  updateGroupe,
  updateLoadMessage,
  updateLoadPost,
  updateCurrentPost
} = connectedSlice.actions;
export default connectedSlice.reducer;
