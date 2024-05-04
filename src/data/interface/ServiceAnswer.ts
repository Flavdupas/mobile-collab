import { ServiceInterface } from "./Service"

export interface AnswerService {
  id_service: number
  id_etudiant: number
  validation_createur: boolean
  validation_repondeur: boolean
  service: ServiceInterface
}