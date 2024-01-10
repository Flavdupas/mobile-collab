import AuthModel from "../../model/auth/Auth";

export default class ConnectedViewModel {
    private authViewModel;

  constructor() {
    this.authViewModel = new AuthModel
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
    };
    notifications: {
      id_notification: number;
      id_etudiant: number;
      id_message: string | null;
      id_post: number | null;
      id_groupe: number | null;
      titre: string;
      date_notification: Date | null;
    }[];
  } | null> {
    try {
        return await this.authViewModel.getUser(token);
    } catch (error) {
      console.log("Erreur : " + error)
        return null;
    }
  }
}
