export interface Match {
  "0": N0
  themes: Theme[]
}

export interface N0 {
  id_utilisateur: number
  id_admin_refuser: any
  id_admin_valider: number
  credit: number
  nom: string
  prenom: string
  telephone: string
  date_naissance: string
  rencontre: number
  path_carteetu: string
  date_traitement?: string
  date_demande: string
  date_validation: string
  date_refus: any
  commentaire_refus: any
  id_lycee: number
  email: string
  password: string
  path_pp: string
  token_code: string
  verified_at: string
  created_at: string
  updated_at: any
  deleted_at: any
  aMatch: number
}

export interface Theme {
  id_etudiant: number
  id_theme: number
  libelle_theme: string
  path_logo: string
  path_background: any
  color_hex: string
  created_at: string
  updated_at: any
}
