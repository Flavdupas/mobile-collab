import { Etudiant } from "./Service"

export type CommentsInterface = Comment[]

export interface Comment {
  id_etudiant: number
  id_post: number
  contenu: string
  created_at: string
  updated_at: any
  etudiant: Etudiant
}
