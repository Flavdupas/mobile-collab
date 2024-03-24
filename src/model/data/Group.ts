import { GroupMessage } from "../../data/interface/Group";

export class GroupModel {
  private apiUrl = process.env.EXPO_PUBLIC_API_URL;

  public async getGroup(
    token: string,
    search: string
  ): Promise<GroupMessage | null> {
    try {
      let response = null;
      if (search) {
        response = await fetch(`${this.apiUrl}/user/groupe`, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ search: search }),
        });
      } else {
        response = await fetch(`${this.apiUrl}/user/groupe`, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
      }

      let data: GroupMessage | null = null;
      if (response.ok) {
        data = await response.json();
        console.log(data);
      }
      return data;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
