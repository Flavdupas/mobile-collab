import { Role } from "../../data/interface/Role";
import AuthModel from "../../model/auth/Auth";

export default class ConnectedViewModel {
  private authViewModel;

  constructor() {
    this.authViewModel = new AuthModel();
  }

  public async getUser(token: string): Promise<{
    utilisateur: {
      id_utilisateur: number;
      email: string;
      path_pp: string | null;
    };
    etudiant: {
      credit: number;
      nom: string;
      prenom: string;
      telephone: string;
      date_naissance: string;
      rencontre: boolean;
      roles: Role[];
    };
    notifications: {
      id_notification: number;
      id_etudiant: number;
      id_message: any;
      id_post: any;
      id_groupe: number;
      titre: string;
      date_visionné: any;
      date_notification: string;
      id_createur: number;
      id_classe: any;
      id_service: number;
      nom_groupe: string;
      created_at: string;
      updated_at: any;
    }[];
  } | null> {
    try {
      return await this.authViewModel.getUser(token);
    } catch (error) {
      console.log("Erreur : " + error);
      return null;
    }
  }
}
