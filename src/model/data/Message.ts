export default class MessageModel {
  private apiUrl = process.env.EXPO_PUBLIC_API_URL;

  public async sendMessage(
    token: string,
    idReceveur: number | null,
    idRecevoirGroupe: number | null,
    content: string
  ): Promise<void> {
    try {
      let sendData = {};
      if (idReceveur) {
        sendData = {
          contenu: content,
          id_receveur: idReceveur,
        };
      }

      if (idRecevoirGroupe) {
        sendData = {
          contenu: content,
          id_recevoir_groupe: idRecevoirGroupe,
        };
      }

      const response = await fetch(`${this.apiUrl}/message/send`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });
      console.log(await response.json());
    } catch (e) {
      console.log(e);
    }
  }

  public async delete(token:string, idReceveur:number|null,idRecevoirGroupe:number|null): Promise<void> {
    try {
      let sendData = {};
      if (idReceveur) {
        sendData = {
          id_receveur: idReceveur,
        };
      }

      if (idRecevoirGroupe) {
        sendData = {
          id_recevoir_groupe: idRecevoirGroupe,
        };
      }
      const res = await fetch(`${this.apiUrl}/message/delete`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      })
      console.log(await res.json())
    } catch(e) {
      console.log(e)
    }
  }
}
