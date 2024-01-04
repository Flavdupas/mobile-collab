export default class LoginModel {
  constructor() {}

  public async login(
    email: string,
    password: string
  ): Promise<{ login: boolean; message?: string; token?: string }> {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    try {
      const response = await fetch(apiUrl + "/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data: { login: boolean; message?: string; token?: string } = await response.json();
      return data;
    } catch (error) {
      return { login: false };
    }
  }

}
