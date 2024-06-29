import { FunctionComponent, PropsWithChildren, createContext, useContext, useState } from "react";
import Toast from "../components/Toast";

interface ToastContextType {
    toast: string | null,
    setToast: (toast: string | null) => void
    isError: boolean
    setIsError: (isError: boolean) => void
}
const ToastContext = createContext<ToastContextType>({
    toast: null,
    setToast: () => { },
    isError: false,
    setIsError: () => { }
})

export const useToasts = () => {
    const { toast, setToast, isError, setIsError } = useContext(ToastContext)
    const pushToast = (toast: string | null, isError: boolean = false) => {
        setToast(toast)
        setIsError(isError)
        setTimeout(() => {
            setToast(null)
        }, 3000);
    }
    return {
        toast,
        isError,
        pushToast
    }
}

//ity no methode fiable par rapport @ le ao @ React_Pokemons
export const ToastContextProvider: FunctionComponent = ({ children }: PropsWithChildren) => {
    const [toast, setToast] = useState<string | null>(null)
    const [isError, setIsError] = useState<boolean>(false)
    return (
        <ToastContext.Provider value={{ toast, setToast, isError, setIsError }}>
            <Toast />
            {children}
        </ToastContext.Provider>
    )
}