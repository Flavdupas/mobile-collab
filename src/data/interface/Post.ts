/* INTERFACES */
interface PostInterface {
  id_post: number;
  id_etudiant: number;
  titre: string;
  contenu: string;
  path_image: string | null;
  created_at: Date;
  updated_at: Date | null;
  id_utilisateur: number;
  id_admin_refuser: number | null;
  id_admin_valider: number;
  credit: number;
  nom: string;
  prenom: string;
  telephone: string;
  date_naissance: Date;
  rencontre: number;
  path_carteetu: string;
  date_traitement: Date;
  date_demande: string;
  date_validation: Date;
  date_refus: Date | null;
  commentaire_refus: Date | null;
  date_sco: string;
  id_classe: number;
  id_section: number;
  libelle_classe: string;
  id_lycee: number;
  libelle_section: string;
  like_count: number;
  comment_count: number;
}
