import { BasicService } from "../../../data/interface/Service";
import ServiceModel from "../../../model/data/Service";

export default class ServiceCrud {
  private serviceModel: ServiceModel;

  constructor() {
    this.serviceModel = new ServiceModel();
  }

  public async createService(data: BasicService, token:string) {
    try {
        return await this.serviceModel.create(data,token);
    } catch (e) {
        console.log(e)
    }
  }
}
