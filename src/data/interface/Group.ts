export interface GroupMessage {
  direct: Direct[]
  groupes: Groupe[]
}

export interface Direct {
  commentaire_refus: any
  credit: number
  date_demande: string
  date_naissance: string
  date_refus: any
  date_traitement: any
  date_validation: string
  id_admin_refuser: any
  id_admin_valider: number
  id_utilisateur: number
  nom: string
  path_carteetu: string
  prenom: string
  rencontre: number
  telephone: string
}

export interface Groupe {
  created_at: string
  id_classe: any
  id_createur: number
  id_etudiant: number
  id_groupe: number
  id_service: number
  nom_groupe: string
  updated_at: any
}
