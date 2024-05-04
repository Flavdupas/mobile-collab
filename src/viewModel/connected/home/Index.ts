import ThemeModel from "../../../model/data/Theme";
import PostModel from "../../../model/data/Post";
import ServiceModel from "../../../model/data/Service";

export default class IndexViewModel {
  private themeModel: ThemeModel;
  private serviceModel: ServiceModel;
  private postModel: PostModel;

  constructor() {
    this.themeModel = new ThemeModel();
    this.serviceModel = new ServiceModel();
    this.postModel = new PostModel();
  }

  public async getThemes(): Promise<ThemeInterface[] | null> {
    try {
      let data = await this.themeModel.getThemes();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async getRecentService(
    token: string
  ): Promise<ServiceInterface[] | null> {
    try {
      const data = await this.serviceModel.getRecentServices(token);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async serviceRecommended(
    token: string
  ): Promise<ServiceInterface[] | null> {
    try {
      const data = await this.serviceModel.serviceRecommended(token);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async getRecentPost(token: string): Promise<PostInterface[] | null> {
    try {
      const data = await this.postModel.getRecentPosts(token);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
