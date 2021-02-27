import { createContext, useState, useContext, FC } from "react";

interface SnackbarType {
    isOpen: boolean
    text: string
    type: 'success' | 'error' | 'warning' | 'info'
    open: (text: string, type: 'success' | 'error' | 'warning' | 'info') => void
    close: () => void
}

const SnackbarContext = createContext<SnackbarType>({
    isOpen: false,
    text: '',
    type: 'success',
    open: (text: string, type: 'success' | 'error' | 'warning' | 'info') => null,
    close: () => null
})

export const SnackbarProvider: FC = ({children}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [text, setText] = useState<string>('')
    const [type, setType] = useState<'success' | 'error' | 'warning' | 'info'>('success')

    const open = (text: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
        setText(text)
        setType(type)
        setIsOpen(true);
    }

    const close = () => setIsOpen(false)

    return <SnackbarContext.Provider value={{isOpen, text, type, open, close}}>{children}</SnackbarContext.Provider>
}

export const useSnackbarContext = () => useContext(SnackbarContext)

export const AuthConsumer = SnackbarContext.Consumer

