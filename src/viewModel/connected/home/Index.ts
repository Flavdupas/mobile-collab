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
}
