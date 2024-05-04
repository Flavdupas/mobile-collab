import { ServiceInterface } from "../../../data/interface/Service";
import ServiceModel from "../../../model/data/Service";
import ThemeModel from "../../../model/data/Theme";

export default class ServiceViewModel {
  private themeModel: ThemeModel;
  private serviceModel: ServiceModel;
  constructor() {
    this.serviceModel = new ServiceModel();
    this.themeModel = new ThemeModel();
  }

  public async getThemes(): Promise<ThemeInterface[] | null> {
    try {
      const data = await this.themeModel.getThemes();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async search(
    token: string,
    id_theme?: number | null,
    keyword?: string | null
  ): Promise<ServiceInterface[][] | null> {
    try {
      const data = await this.serviceModel.search(
        token,
        id_theme && id_theme > 0 ? id_theme : null,
        keyword
      );
      let finalData = [] as ServiceInterface[][];
      if (data) {
        let count = 0;
        let tempArray = [] as ServiceInterface[];
        let dataLength = data.length;
        data.map((item) => {
          if (count === 5) {
            finalData.push(tempArray);
            tempArray = [];
            count = 0;
            dataLength -= 5;
          }
          tempArray = [...tempArray, item];
          count++;
          if (dataLength <= 5 && count === dataLength) {
            finalData.push(tempArray);
          }
        });
      }
      return finalData;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
