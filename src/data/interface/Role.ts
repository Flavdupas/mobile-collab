
export interface Role {
  id_role: number
  libelle_role: string
  created_at: string
  updated_at: any
  pivot: Pivot
}

export interface Pivot {
  id_etudiant: number
  id_role: number
}
