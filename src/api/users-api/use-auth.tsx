
import axios from "axios"
import { FunctionComponent, PropsWithChildren, createContext, useContext, useState } from "react"
import { BASE_URL } from "../../tools/base-url"
import User from "../../models/user"
import { useToasts } from "../../hooks/useToasts"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext({
    isAuth: false,
    setIsAuth: (is: boolean) => { },
    user: User,
    setUser: (u: User) => { },
    stateAxiosAuth: {
        isLoading: false,
        error: null
    },
    setStateAxiosAuth: (s: StateAxios) => { }
})

export const useAuth = () => {
    const { isAuth, setIsAuth, user, setUser, stateAxiosAuth, setStateAxiosAuth } = useContext(AuthContext)

    const { pushToast } = useToasts()
    const redirect = useNavigate()

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
            redirect('/')
            pushToast(`Bonjour ${user.pseudo} !!`)
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
        user,
        stateAxiosAuth
    }
}

export const AuthContextProvider: FunctionComponent = ({ children }: PropsWithChildren) => {
    const [isAuth, setIsAuth] = useState<boolean>(false)
    const [user, setUser] = useState<User>()
    const [stateAxiosAuth, setStateAxiosAuth] = useState<StateAxios>()

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth, user, setUser, stateAxiosAuth, setStateAxiosAuth }} >
            {children}
        </AuthContext.Provider>
    )
}
