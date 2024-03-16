import { BasicService } from "../../../data/interface/Service";
import ServiceModel from "../../../model/data/Service";

export default class ServiceCrud {
  private serviceModel: ServiceModel;

  constructor() {
    this.serviceModel = new ServiceModel();
  }

  public async createService(data: BasicService) {
    try {
        return await this.serviceModel.create(data);
    } catch (e) {
        console.log(e)
    }
  }
}
