
import axios from "axios"
import { FunctionComponent, PropsWithChildren, createContext, useContext, useState } from "react"
import { BASE_URL } from "../../tools/base-url"
import User from "../../models/user"
import { useToasts } from "../../hooks/useToasts"
import { useLocation, useNavigate } from "react-router-dom"
import { FormUser, StateAxios } from "../../tools/type"

interface AuthContextType {
    isAuth: boolean
    setIsAuth: (isAuth: boolean) => void
    user: User | undefined
    setUser: (user: User | undefined) => void
    stateAxiosAuth: StateAxios
    setStateAxiosAuth: (stateAxiosAuth: StateAxios) => void
}

const AuthContext = createContext<AuthContextType>({
    isAuth: false,
    setIsAuth: () => { },
    user: undefined,
    setUser: () => { },
    stateAxiosAuth: {
        isLoading: false,
        error: null
    },
    setStateAxiosAuth: () => { }
})

export const useAuth = () => {
    const { isAuth, setIsAuth, user, setUser, stateAxiosAuth, setStateAxiosAuth } = useContext(AuthContext)

    const { pushToast } = useToasts()
    const navigate = useNavigate()
    const location = useLocation();

    const login = async (formUser: FormUser) => {
        try {
            setStateAxiosAuth({ ...stateAxiosAuth, isLoading: true })
            const user = {
                pseudo: formUser.pseudo.value,
                password: formUser.password.value
            }
            const response = await axios.post(`${BASE_URL}login`, user)
            localStorage.setItem('token', response.data.token)
            setIsAuth(true)
            setUser(response.data.user)
            pushToast(`Bonjour ${user.pseudo}.`)
            setStateAxiosAuth({ ...stateAxiosAuth, isLoading: false })
            const from = location.state?.from || "/"
            if (from !== "/login " && from !== "/signup") navigate(from)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                pushToast(error.response?.data.message, true)
                setStateAxiosAuth({ ...stateAxiosAuth, isLoading: false, error: error.response?.data.message })
            } else
                setStateAxiosAuth({ ...stateAxiosAuth, isLoading: false, error: error })
        }
    }

    const logout = () => {
        try {
            localStorage.removeItem('token')
            setIsAuth(false)
            pushToast(`Au revoir ${user?.pseudo}.`)
            setUser(undefined)
            navigate('/login')
            setStateAxiosAuth({ ...stateAxiosAuth, isLoading: false })

        } catch (error) {
            if (axios.isAxiosError(error)) {
                pushToast(error.response?.data.message, true)
                setStateAxiosAuth({ ...stateAxiosAuth, isLoading: false, error: error.response?.data.message })
            } else
                setStateAxiosAuth({ ...stateAxiosAuth, isLoading: false, error: error })
        }
    }

    return {
        isAuth,
        login,
        logout,
        user,
        stateAxiosAuth
    }
}

export const AuthContextProvider: FunctionComponent = ({ children }: PropsWithChildren) => {
    const [isAuth, setIsAuth] = useState<boolean>(false)
    const [user, setUser] = useState<User>()
    const [stateAxiosAuth, setStateAxiosAuth] = useState<StateAxios>({ isLoading: false, error: null })

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth, user, setUser, stateAxiosAuth, setStateAxiosAuth }} >
            {children}
        </AuthContext.Provider>
    )
}
