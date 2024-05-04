export default class ThemeModel {
  constructor() {}

  public async getThemes(): Promise<ThemeInterface[] | null> {
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
      return data;
    } catch (error) {
      return null;
    }
  }
}
