import { useState } from "react"
import { BASE_URL } from "../../tools/base-url"
import axios from "axios"
import { useToasts } from "../../hooks/useToasts"
import { useNavigate } from "react-router-dom"
import { FormUser, StateAxios } from "../../tools/type"

export const useAxiosCreateUsers = () => {
    const [stateAxios, setStateAxios] = useState<StateAxios>({
        isLoading: false,
        data: null,
        error: null,
    })

    const { pushToast } = useToasts()
    const navigate = useNavigate()

    const createUser = async (formUser: FormUser) => {
        const user = {
            pseudo: formUser.pseudo.value,
            password: formUser.password.value
        }
        try {
            setStateAxios({ ...stateAxios, isLoading: true })
            const response = await axios.post(`${BASE_URL}signup`, user)
            setStateAxios({ isLoading: false, data: response.data, error: null });
            navigate('/login')
            pushToast('Votre compte a été créé.')
        } catch (error) {
            if (axios.isAxiosError(error)) {
                pushToast(error.response?.data.message, true)
                setStateAxios({ data: null, isLoading: false, error: error.response?.data.message });
            } else
                setStateAxios({ data: null, isLoading: false, error: error });
        }
    }

    return { stateAxios, createUser }
}