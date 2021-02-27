import { UserRegistration } from '../models/user.model'
import { api } from '../plugins/axios'

export const registry = async (payload: UserRegistration): Promise<void> => {
  try {
    await api.post('/users/register', payload)
  } catch (e) {
    throw e
  }
}
