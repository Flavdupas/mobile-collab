/* INTERFACES */
interface Post {
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

/* CLASSE */
export default class PostModel {
  constructor() {}

  public async getRecentPosts(token: string): Promise<Post[] | null> {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    try {
      const response = await fetch(`${apiUrl}/post/recent`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      let data: Post[] | null = null;
      if (response.ok) {
        data = await response.json();
      }
      return data;
    } catch (error) {
      return null;
    }
  }
}
