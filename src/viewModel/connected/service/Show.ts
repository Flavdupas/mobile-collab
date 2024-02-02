import ServiceModel from "../../../model/data/Service";

export default class ShowViewModel {
    private serviceModel: ServiceModel;

    constructor() {
        this.serviceModel = new ServiceModel();
    }

    public async answerService(idService:number, token:string): Promise<boolean> {
        try {
            return await this.serviceModel.answer(idService,token);
        } catch (error) {
            return false;
        }
    }
}