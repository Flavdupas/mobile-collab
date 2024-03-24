export interface Message {
  contenu: string
  created_at: string
  id_envoyeur: number
  id_receveur: number|null
  id_recevoir_groupe: number|null
}
