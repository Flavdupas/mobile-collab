import { BasicService, ServiceInterface } from "../../data/interface/Service";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default class ServiceModel {
  constructor() {}

  public async serviceRecommended(
    token: string
  ): Promise<ServiceInterface[] | null> {
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

  public async search(
    token: string,
    id_theme?: number | null,
    keyword?: string | null
  ): Promise<ServiceInterface[] | null> {
    let formData = {};
    if (id_theme) {
      formData = { id_theme: id_theme };
    }
    if (keyword) {
      formData = { keyword: keyword };
    }
    if (keyword && id_theme) {
      formData = { keyword: keyword, id_theme: id_theme };
    }
    try {
      const response = await fetch(apiUrl + "/service/search", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Traitez la réponse ici
      let data = null;
      if (response.ok) {
        data = await response.json();
      }
      console.log(data.length);
      return data;
    } catch (error) {
      // Gérer les erreurs ici
      //console.error("Erreur lors de l'envoi de la requête :", error);
      return null;
    }
  }

  public async answer(idService: number, token: string): Promise<boolean> {
    try {
      const response = await fetch(`${apiUrl}/service/answer/${idService}`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      return response.ok;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  public async create(data: BasicService): Promise<void> {
    const url = `${apiUrl}/service/create`;
    const body = JSON.stringify(data);
    console.log(body)
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization:
          "Bearer 159|yeTlNvfZWSOCfYDp1eBxnt0WZBy1qvk8UcINJn2zde97c608",
        "Content-Type": "application/json",
      },
      body: body,
    });

    console.log(response.ok);
  }
}
