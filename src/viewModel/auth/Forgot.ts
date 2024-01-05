import AuthModel from "../../model/auth/Auth";

export default class ForgotViewModel {
  private model: AuthModel;

  constructor() {
    this.model = new AuthModel();
  }

  public async emailExists(
    email: string
  ): Promise<{ exists: boolean; message?: string }> {
    try {
      return this.model.emailExistsForgot(email);
    } catch (error) {
      console.log(error);
      return { exists: false };
    }
  }

  public async verifyCode(
    email: string,
    code: number
  ): Promise<{ correct: boolean; message?: string; token?: string }> {
    try {
      return this.model.verifyCodeForgot(email, code);
    } catch (error) {
      return { correct: false };
    }
  }

  public async resetPassword(
    token: string,
    password: string
  ): Promise<{
    changed: boolean;
    message?:string,
  }> {
    try {
      return this.model.resetPassword(token, password);
    } catch (error) {
      return { changed: false };
    }
  }
}
