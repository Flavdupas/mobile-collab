export default class PostModel {
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
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    try {
      const response = await fetch(`${apiUrl}/post/all`, {
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
      console.log(error)
      return null;
    }
  }
}
