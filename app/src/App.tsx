import React, { FC } from 'react';
import { QueryClient, QueryClientProvider } from "react-query";
import './App.css';
import { AxiosProvider } from './context/axios.context'
import { AuthConsumer, AuthProvider } from './context/auth.context'
import {AuthorizedLayout} from './layouts/authorized.layout'
import {UnauthorizedLayout} from './layouts/unauthorized.layout'

const queryClient = new QueryClient()


const App: FC = () => {

  return (
    <AxiosProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AuthConsumer>
            { state => state?.isLoggedIn ? <AuthorizedLayout /> : <UnauthorizedLayout />}
          </AuthConsumer>
        </AuthProvider>
      </QueryClientProvider>
    </AxiosProvider>
  );
}

export default App;
