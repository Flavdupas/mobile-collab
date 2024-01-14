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

interface ServiceRecommendedResponse {
  data: Service[];
}

export default class ServiceModel {
  constructor() {}

  public async serviceRecommended(token: string): Promise<Service[] | null> {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    try {
      const response = await fetch(`${apiUrl}/service/recommended`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      let data = null;
      data = (await response.json()) as Service[];

      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
