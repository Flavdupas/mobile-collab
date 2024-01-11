import DataModel from "../../../model/data/Data";

export default class IndexViewModel {
  private dataModel: DataModel;

  constructor() {
    this.dataModel = new DataModel();
  }

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
    try {
      const data = await this.dataModel.getThemes();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async getRecentService(token: string): Promise<
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
    try {
      const data = await this.dataModel.getRecentServices(token);
      console.log("Data : " + data);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
