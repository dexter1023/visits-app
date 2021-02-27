import { PatientVisit } from './patient.model'
import { MeasurementVisit } from './measurement.model'
import { MedicamentVisit } from './medicament.model'

export interface VisitListItem {
  id: number
  vistiDate: string
  patient: PatientVisit
}

export interface VisitPatient {
  id: number
  visitDate: string
  visitDateStart: string
  visitDateEnd: string
  isCompleted: boolean
  description: string
  recommendations: string
  measurements: MeasurementVisit[]
  medicaments: MedicamentVisit[]
}

export interface CreateVisitRequest {
  patientId: number
  visitDate: string
}
