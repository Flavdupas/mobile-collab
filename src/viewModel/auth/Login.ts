import AuthModel from "../../model/auth/Auth";

export default class LoginViewModel {
  private model: AuthModel;

  constructor() {
    this.model = new AuthModel();
  }

  public async login(
    email: string,
    password:string,
  ): Promise<{ login: boolean; message?: string, token?:string }> {
    try {
      return this.model.login(email,password);
    } catch (error) {
      console.log(error);
      return { login: false };
    }
  }
}
