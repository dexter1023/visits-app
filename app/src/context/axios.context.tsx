import { AxiosInstance } from "axios";
import React, { useMemo, createContext } from 'react'
import { api } from '../plugins/axios';

export const AxiosContext = createContext<AxiosInstance>(api)

export const AxiosProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const axios = useMemo(() => {
    const axios = api

    axios.interceptors.request.use((config) => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    })

    return axios
  }, [])

  return <AxiosContext.Provider value={axios}>{children}</AxiosContext.Provider>
}
