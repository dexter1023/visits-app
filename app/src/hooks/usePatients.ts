import { api } from '../plugins/axios'
import { useMutation, useQuery } from 'react-query'
import {
  PatientList,
  PatientModel,
  PatientRequest,
} from '../models/patient.model'

export const usePatients = (search: string) =>
  useQuery(['patients', search], async () => {
    const { data } = await api.get<PatientList[]>('/patients', {
      params: { search },
    })
    return data
  })

export const usePatient = (id: number) =>
  useQuery(['patient', id], async () => {
    const { data } = await api.get<PatientModel>(`/patients/${id}`)
    return data
  })

export const usePatientMutation = () =>
  useMutation((patient: PatientRequest) => api.post('/patients', patient))
