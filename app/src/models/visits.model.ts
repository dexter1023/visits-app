import { PatientModel, PatientVisit } from './patient.model'
import { MeasurementVisit } from './measurement.model'
import { MedicamentVisit } from './medicament.model'

export interface VisitListItem {
  id: number
  visitDate: string
  patient: PatientVisit
}

export interface VisitPatient {
  id: number
  visitDate: string
  visitDateStart: string
  visitDateEnd: string
  isCompleted: boolean
  description: string
  patient: PatientModel
  recommendations: string
  measurements: MeasurementVisit[]
  medicaments: MedicamentVisit[]
}

export interface CreateVisitRequest {
  patientId: number
  visitDate: string
}

export interface ExecutedVisitPayload {
  id: number
  description: string
  recommendations: string
  measurements: MeasurementVisit[]
  medicaments: MedicamentVisit[]
}
