export interface ServiceInterface {
  created_at: Date;
  date_debut: Date | null;
  date_fin: Date | null;
  description: string;
  id_etudiant: number;
  id_service: number;
  id_statutservice: number;
  id_theme: number;
  id_typeservice: number;
  prix: number;
  titre: string;
  updated_at: Date | null;
  etudiant: {
    commentaire_refus: string | null;
    credit: number;
    date_demande: Date;
    date_naissance: Date;
    date_refus: Date | null;
    date_traitement: Date;
    date_validation: Date;
    id_admin_refuser: number | null;
    id_admin_valider: number;
    id_utilisateur: number;
    nom: string;
    path_carteetu: string;
    prenom: string;
    rencontre: boolean;
    telephone: string;
  };
  photos: {
    id_service: number;
    id_photo: number;
    path: string;
    created_at: Date | null;
    updated_at: Date | null;
  }[];
  theme: {
    color_hex: string;
    created_at: Date;
    id_theme: number;
    libelle_theme: string;
    path_logo: string;
    updated_at: Date | null;
  };
  type_service: {
    id_typeservice: number;
    libelle_type: string;
    created_at: Date | null;
    updated_at: Date | null;
  };
  covoiturage: {
    id_service: number;
    adresse_depart: string;
    adresse_arrive: string;
    nb_place: number;
    vehicul_personnel: boolean;
  } | null;
  evenement: {
    id_service: number;
    adresse: string;
  } | null;
  echange_competence: { id_service: number } | null;
  film: {
    id_service: number;
    id_lieufilm: number;
    id_typefilm: number;
    nom_film: string;
  } | null;
  echange_lecture: {
    id_service: number;
  } | null;
}

export interface BasicService {
  title: string | null;
  description: string | null;
  type: 0 | 1;
  price: number | null;
  id_theme: number | null;
  dateDebut: number | null;
  dateFin: number | null;
}

export type InterestedArray = Interested[]

export interface Interested {
  id_service: number
  id_etudiant: number
  validation_createur: boolean
  validation_repondeur: boolean
  etudiant: Etudiant
}

export interface Etudiant {
  id_utilisateur: number
  id_admin_refuser: any
  id_admin_valider: number
  credit: number
  nom: string
  prenom: string
  telephone: string
  date_naissance: string
  rencontre: boolean
  path_carteetu: string
  date_traitement: any
  date_demande: string
  date_validation: string
  date_refus: any
  commentaire_refus: any
}
