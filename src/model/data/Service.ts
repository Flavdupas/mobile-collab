import {
  BasicService,
  InterestedArray,
  ServiceInterface,
} from "../../data/interface/Service";

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
      let data = null;
      if (response.ok) {
        data = await response.json();
      }
      return data;
    } catch (error) {
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

  public async create(data: BasicService, token: string): Promise<void> {
    const url = `${apiUrl}/service/create`;
    const body = JSON.stringify(data);
    console.log(body);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: body,
    });

    console.log(response.ok);
  }

  public async getInterested(
    token: string,
    idService: number
  ): Promise<InterestedArray> {
    try {
      const res = await fetch(`${apiUrl}/service/${idService}/interested`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data: InterestedArray = await res.json();
      return data;
    } catch (e) {
      console.log("Erreur : " + e);
      return [];
    }
  }

  public async validate(
    token: string,
    idService: number,
    id_etudiant: number[]
  ) {
    try {
      const res = await fetch(`${apiUrl}/service/validate/${idService}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id_etudiant:id_etudiant}),
      });
      console.log(res.ok);
      return res.ok
    } catch (e) {
      console.log(e);
      return false
    }
  }

  public async report(token:string,idService:number,remarque:string) {
    try {
      const res = await fetch(`${apiUrl}/service/${idService}/report`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({remarque:remarque}),
      });
      console.log(res.ok);
      return res.ok
    } catch (e) {
      console.log(e);
      return false
    }
  }
  public async getUserService(token: string): Promise<ServiceInterface[] | null> {
    try {
      const response = await fetch(`${apiUrl}/service/user`, {
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
      console.log(error);
      return null;
    }
  }

  public async delete(token: string, id: number[]) {
    try {
      const res = await fetch(`${apiUrl}/service/delete`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      console.log(res.ok);
      return res.ok;
    } catch (e) {
      console.log(e);
    }
  }
}
