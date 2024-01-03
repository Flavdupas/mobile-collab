import { Platform } from "react-native";

export default class RegisterModel {
  constructor() {}

  public async emailExists(
    email: string
  ): Promise<{ exists: boolean; message?: string }> {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    try {
      const response = await fetch(apiUrl + "/email", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      const data: { exists: boolean; message?: string } = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return { exists: false };
    }
  }

  public async verifyCode(
    email: string,
    code: number
  ): Promise<{ correct: boolean; message?: string; token?: string }> {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    try {
      const response = await fetch(apiUrl + "/email/code", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          code: code,
        }),
      });
      const data: { correct: boolean; message?: string; token?: string } =
        await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return { correct: false };
    }
  }

  public async register(token: string,birthday: number,phone: number,meet: boolean,themes: number[],image: string,password: string) {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    // Créer un objet FormData
    const formData = new FormData();
    const uri = Platform.OS === "android" ? image : image.replace("file://", "");
    const filename = image.split("/").pop();

    const match = /\.(\w+)$/.exec(filename as string);
    const ext = match?.[1];
    const type = match ? `image/${match[1]}` : `image`;
    // Ajouter les données textuelles au FormData
    formData.append("birthday", birthday.toString());
    formData.append("phone", phone.toString()); // Convertir le numéro de téléphone en chaîne
    formData.append("meet", meet.toString()); // Convertir le booléen en chaîne
    formData.append("themes", JSON.stringify(themes)); // Convertir le tableau en chaîne JSON
    formData.append("image", {
      uri,
      name: `image.${ext}`,
      type,
    } as any);
    formData.append("password", password);
    try {
      const response = await fetch(apiUrl + "/register", {
        method: "POST",
        headers: {
          'Authorization': 'Bearer ' + token,
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      // Traitez la réponse ici
      const data = await response.json();
      console.log(data);
    } catch (error) {
      // Gérer les erreurs ici
      console.log("Erreur lors de l'envoi de la requête :", error);
    }
  }
}
