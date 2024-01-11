export default class DataModel {
  constructor() {}

  public async getThemes(): Promise<
    | {
        id_theme: number;
        libelle_theme: string;
        path_logo: string;
        color_hex: string;
        created_at: Date;
        updated_at: Date | null;
      }[]
    | null
  > {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    try {
      const response = await fetch(apiUrl + "/themes", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      //console.log(data);
      return data;
    } catch (error) {
      return null;
    }
  }

  public async getRecentServices(token: string): Promise<
    | {
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
        id_theme: number;
        libelle_theme: string;
        path_logo: string;
        color_hex: string;
        photos: {
          id_service: number;
          id_photo: number;
          path: string;
          created_at: Date | null;
          updated_at: Date | null;
        }[];
        definir_themes: {
          id_service: 5;
          id_theme: 15;
        }[];
      }[]
    | null
  > {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    try {
      const response = await fetch(apiUrl + "/service/news", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      let data:
        | {
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
            id_theme: number;
            libelle_theme: string;
            path_logo: string;
            color_hex: string;
            photos: {
              id_service: number;
              id_photo: number;
              path: string;
              created_at: Date | null;
              updated_at: Date | null;
            }[];
            definir_themes: {
              id_service: 5;
              id_theme: 15;
            }[];
          }[]
        | null = null;
      if (response.ok) {
        data = await response.json();
      }
      return data;
    } catch (error) {
      return null;
    }
  }
}
