export type Requetes = Requete[]

export interface Requete {
  id_demande: number
  id_etudiant: number
  contenu: string
  reponse: any
  date_reponse: any
  created_at: string
  updated_at: any
}
