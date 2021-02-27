import { createContext, useState, useContext, FC, useEffect } from "react";
import * as Auth from "../services/auth.service";
import { AuthRequest } from "../models/auth.model";
import { loggedIn } from "../services/auth.service";

interface AuthContextType {
    isLoggedIn: boolean
    login: (payload: AuthRequest) => Promise<void>
    logout: () => any
    setLoggedIn: (value: boolean) => void
}

const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    login: (payload: AuthRequest) => new Promise(() => {}),
    logout: () => {},
    setLoggedIn: (value: boolean) => {}
})

export const AuthProvider: FC = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    useEffect(() => {
        setIsLoggedIn(loggedIn())
    }, [])
    const login = async (payload: AuthRequest) => {
        try {
            await Auth.login(payload)
            setLoggedIn(true)
        } catch (e) {
            throw e
        }
    }
    
    const logout = () => {
        Auth.logout()
        setLoggedIn(false)
    }

    const setLoggedIn = (state: boolean) => setIsLoggedIn(state)

    return <AuthContext.Provider value={{isLoggedIn, login, logout, setLoggedIn}}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext)

export const AuthConsumer = AuthContext.Consumer

