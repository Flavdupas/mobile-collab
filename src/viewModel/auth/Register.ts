import AuthModel from "../../model/auth/Auth";
import DataModel from "../../model/data/Data";

export default class RegisterViewModel {
  private authModel: AuthModel;
  private dataModel: DataModel;

  constructor() {
    this.authModel = new AuthModel();
    this.dataModel = new DataModel();
  }

  public async emailExists(
    email: string
  ): Promise<{ exists: boolean; message?: string }> {
    try {
      return this.authModel.emailExistsRegister(email);
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
      const data = await this.dataModel.getThemes();
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
      return this.authModel.verifyCodeRegister(email, code);
    } catch (error) {
      return { correct: false };
    }
  }

  public async register(token: string,birthday: number,phone: string,meet: boolean,themes: number[],image: string,password: string): Promise<{ register: boolean }> {
    try {
      const data = await this.authModel.register(token,birthday,phone,meet,themes,image,password);
      console.log("registerViewModel")
      return data
    } catch (error) {
      console.log(error);
      return {register:false};
    }
  }
}
