import { FunctionComponent, PropsWithChildren, createContext, useContext, useState } from "react";
import Toast from "../components/Toast";

const ToastContext = createContext(
    {
        toast: null,
        setToast: () => { },
    }
)

export const useToasts = () => {
    const { toast, setToast } = useContext(ToastContext)
    const pushToast = (toast : string | null) =>{
        setToast(toast)
        setTimeout(() => {
            setToast(null)
        }, 3000);
    }
    return {
        toast,
        pushToast
    }
}

//ity no methode fiable par rapport @ le ao @ React_Pokemons
export const ToastContextProvider: FunctionComponent = ({ children }: PropsWithChildren) => {
    const [toast, setToast] = useState<string | null>(null)
    return (
        <ToastContext.Provider value={{ toast, setToast }}>
            <Toast />
            {children}
        </ToastContext.Provider>
    )
}