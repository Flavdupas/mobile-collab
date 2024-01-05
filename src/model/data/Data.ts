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
}