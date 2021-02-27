import { VisitPatient } from './visits.model'

export interface PatientModel {
  id: number
  firstName: string
  lastName: string
  email: string
  identityNumber: string
  phoneNumber: string
  street: string
  streetNumber: string
  postalCode: string
  city: string
  interview: string
  visits: VisitPatient[]
}

export interface PatientRequest {
  firstName: string
  lastName: string
  email: string
  identityNumber: string
  phoneNumber: string
  street: string
  streetNumber: string
  postalCode: string
  city: string
  interview: string
}

export interface PatientVisit {
  id: number
  firstName: string
  lastName: string
  email: string
  identityNumber: string
  phoneNumber: string
}

export interface PatientList {
  id: number
  firstName: string
  lastName: string
  email: string
  identityNumber: string
  phoneNumber: string
}
