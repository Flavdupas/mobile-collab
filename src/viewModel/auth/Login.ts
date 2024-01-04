import LoginModel from "../../model/auth/Login";

export default class LoginViewModel {
  private model: LoginModel;

  constructor() {
    this.model = new LoginModel();
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
