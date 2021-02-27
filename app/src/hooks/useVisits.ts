import { api } from '../plugins/axios'
import { useQuery, useMutation } from 'react-query'
import { CreateVisitRequest, VisitListItem } from '../models/visits.model'
import { formatDate } from '../utils/date.utils'

export const useVisits = (date: Date) => {
  return useQuery(['visits', date], async () => {
    const { data } = await api.get<VisitListItem[]>('/visits', {
      params: { date: formatDate(date) },
    })
    return data
  })
}

export const useVisitMutation = () =>
  useMutation((visit: CreateVisitRequest) => api.post('/visits', visit))
