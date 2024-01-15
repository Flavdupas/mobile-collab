export default class ServiceModel {
  constructor() {}

  public async serviceRecommended(
    token: string
  ): Promise<ServiceInterface[] | null> {
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
      data = (await response.json()) as ServiceInterface[];

      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async getRecentServices(
    token: string
  ): Promise<ServiceInterface[] | null> {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    try {
      const response = await fetch(apiUrl + "/service/recent", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      let data: ServiceInterface[] | null = null;
      if (response.ok) {
        data = await response.json();
      }
      return data;
    } catch (error) {
      return null;
    }
  }
}
