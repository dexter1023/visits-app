import React, { FC, useEffect, useRef } from 'react';
import { QueryClient, QueryClientProvider } from "react-query";
import { AxiosProvider } from './context/axios.context'
import { AuthConsumer, AuthProvider, useAuthContext } from './context/auth.context'
import {SnackbarProvider} from './context/snackbar.context'
import {SnackbarComponent} from './components/Snackbar'
import { AuthorizedLayout } from './layouts/authorized.layout'
import { UnauthorizedLayout } from './layouts/unauthorized.layout'

const queryClient = new QueryClient()

const App: FC = () => {
  return (
    <AxiosProvider>
      <SnackbarProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <AuthConsumer>
              { state => state?.isLoggedIn ? <AuthorizedLayout /> : <UnauthorizedLayout />}
            </AuthConsumer>
          </AuthProvider>
          <SnackbarComponent />
        </QueryClientProvider>
      </SnackbarProvider>
    </AxiosProvider>
  );
}

export default App;
