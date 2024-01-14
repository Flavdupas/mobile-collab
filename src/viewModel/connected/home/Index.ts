import DataModel from "../../../model/data/Data";
import ServiceModel from "../../../model/data/Service";

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

  constructor() {
    this.dataModel = new DataModel();
    this.serviceModel = new ServiceModel();
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
      console.log("Data : " + data);
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
}
