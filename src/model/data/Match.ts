import { Match } from "../../data/interface/Match";

export class MatchModel {
  private apiUrl = process.env.EXPO_PUBLIC_API_URL;

  public getStudentsToMatch = async (token: string): Promise<Match[]> => {
    try {
      const res = await fetch(`${this.apiUrl}/match`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      return data;
    } catch (e) {
      console.log(e);
      return [];
    }
  };

  public createMatch = async (token: string, idEtudiant: number) => {
    try {
      const res = await fetch(`${this.apiUrl}/match/create/${idEtudiant}`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      console.log(res.ok)
    } catch (e) {
      console.log(e);
    }
  };
}
