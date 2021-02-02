import { createContext, useState, useContext, FC } from "react";
import * as Auth from "../auth/auth.service";
import { AuthRequest } from "../models/auth.model";

interface AuthContextType {
    isLoggedIn: boolean
    login: (payload: AuthRequest) => Promise<void>
    logout: () => any
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: FC = ({children}) => {
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false)

    const login = async (payload: AuthRequest) => {
        try {
            await Auth.login(payload)
            setLoggedIn(true)
        } catch (e) {
            console.log(e)
        }
    }

    const logout = () => {
        Auth.logout()
        setLoggedIn(false)
    }

    return <AuthContext.Provider value={{isLoggedIn, login, logout}}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext)

export const AuthConsumer = AuthContext.Consumer

