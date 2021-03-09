import { api } from '../plugins/axios'
import { useQuery, useMutation } from 'react-query'
import {
  CreateVisitRequest,
  ExecutedVisitPayload,
  VisitListItem,
  VisitPatient,
} from '../models/visits.model'
import { formatDate } from '../utils/date.utils'

export const useVisits = (date: Date) => {
  return useQuery(['visits', date], async () => {
    const { data } = await api.get<VisitListItem[]>('/visits', {
      params: { date: formatDate(date.toISOString()) },
    })
    return data
  })
}

export const useVisit = (id: string) => {
  return useQuery(
    ['visit', id],
    async () => {
      const { data } = await api.get<VisitPatient>(`/visits/${id}`)
      return data
    },
    {
      enabled: false,
    }
  )
}

export const useVisitMutation = () =>
  useMutation((visit: CreateVisitRequest) => api.post('/visits', visit))

export const useFinishVisitMutation = () =>
  useMutation((visit: ExecutedVisitPayload) =>
    api.post('/visits/finish', visit)
  )
