import RegisterModel from "../../model/auth/Register";

export default class RegisterViewModel {
  private model: RegisterModel;

  constructor() {
    this.model = new RegisterModel();
  }

  public async emailExists(
    email: string
  ): Promise<{ exists: boolean; message?: string }> {
    try {
      return this.model.emailExists(email);
    } catch (error) {
      console.log(error);
      return { exists: false };
    }
  }

  public async getThemes(): Promise<
    | {
        id_theme: number;
        libelle_theme: string;
        path_logo: string;
        color_hex: string;
        created_at: Date;
        updated_at: Date | null;
      }[]
    | null
  > {
    try {
      const data = await this.model.getThemes();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async verifyCode(
    email: string,
    code: number
  ): Promise<{ correct: boolean; message?: string; token?: string }> {
    try {
      return this.model.verifyCode(email, code);
    } catch (error) {
      return { correct: false };
    }
  }

  public async register(
    token: string,
    birthday: number,
    phone: number,
    meet: boolean,
    themes: number[],
    image: string,
    password: string
  ) {
    try {
      this.model.register(
        token,
        birthday,
        phone,
        meet,
        themes,
        image,
        password
      );
    } catch (error) {
      console.log(error);
    }
  }
}
