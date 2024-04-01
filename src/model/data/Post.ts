import { Platform } from "react-native";

export default class PostModel {
      private apiUrl = process.env.EXPO_PUBLIC_API_URL;
  constructor() {}

  public async getRecentPosts(token: string): Promise<PostInterface[] | null> {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    try {
      const response = await fetch(`${apiUrl}/post/recent`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      let data: PostInterface[] | null = null;
      if (response.ok) {
        data = await response.json();
      }
      return data;
    } catch (error) {
      return null;
    }
  }

  public async getAll(token: string): Promise<PostInterface[] | null> {

    try {
      const response = await fetch(`${this.apiUrl}/post/all`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      let data: PostInterface[] | null = null;
      if (response.ok) {
        data = await response.json();
      }
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  public async getUserPost(token: string): Promise<PostInterface[] | null> {

    try {
      const response = await fetch(`${this.apiUrl}/post/user`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      let data: PostInterface[] | null = null;
      if (response.ok) {
        data = await response.json();
      }
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async create(token: string, title: string, content: string, image?: string): Promise<boolean> {
    try {
      const formData = new FormData();
      if (image) {
        const uri =
          Platform.OS === "android" ? image : image.replace("file://", "");
        const filename = image.split("/").pop();

        const match = /\.(\w+)$/.exec(filename as string);
        const ext = match?.[1];
        const type = match ? `image/${match[1]}` : `image`;
        formData.append("image", {
          uri,
          name: `image.${ext}`,
          type,
        } as any);
      }
      formData.append("titre", title);
      formData.append("contenu", content);
      const res = await fetch(`${this.apiUrl}/post/create`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      }) 
      console.log(res.ok)
      return res.ok;
    } catch (e) {
      console.log(e)
      return false
    }
  }

  public async delete(token:string, id:number[]) {
    try {
      const res = await fetch(`${this.apiUrl}/post/delete`,{
        method:"POST",
        headers: {
           Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id:id})
      })
      console.log(res.ok)
      return res.ok
    } catch(e) {
      console.log(e)
    }
  }
}
