import DataModel from "../../../model/data/Data";
import PostModel from "../../../model/data/Post";
import ServiceModel from "../../../model/data/Service";

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


interface Theme {
  id_theme: number;
  libelle_theme: string;
  path_logo: string;
  color_hex: string;
  created_at: Date;
  updated_at: Date | null;
}

interface RecentService {
  id_service: number;
  id_statutservice: number;
  id_typeservice: number;
  id_etudiant: number;
  titre: string;
  description: string;
  date_debut: Date | null;
  date_fin: Date | null;
  created_at: Date | null;
  updated_at: Date | null;
  prix: number;
  theme: Theme;
  photos: {
    id_service: number;
    id_photo: number;
    path: string;
    created_at: Date | null;
    updated_at: Date | null;
  }[];
}

interface Service {
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
}

export default class IndexViewModel {
  private dataModel: DataModel;
  private serviceModel: ServiceModel;
  private postModel: PostModel;

  constructor() {
    this.dataModel = new DataModel();
    this.serviceModel = new ServiceModel();
    this.postModel = new PostModel();
  }

  public async getThemes(): Promise<Theme[] | null> {
    try {
      const data = await this.dataModel.getThemes();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async getRecentService(
    token: string
  ): Promise<RecentService[] | null> {
    try {
      const data = await this.dataModel.getRecentServices(token);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async serviceRecommended(token: string): Promise<Service[] | null> {
    try {
      const data = await this.serviceModel.serviceRecommended(token);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async getRecentPost(token: string):Promise<Post[] | null> {
    try {
      const data = await this.postModel.getRecentPosts(token);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
