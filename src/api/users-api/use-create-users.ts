import { useState } from "react"
import { BASE_URL } from "../../tools/base-url"
import axios from "axios"
import { useToasts } from "../../hooks/useToasts"
import { useNavigate } from "react-router-dom"

export const useAxiosCreateUsers = () => {
    const [stateAxios, setStateAxios] = useState<StateAxios>({
        isLoading: false,
        data: null,
        error: null,
    })

    const { pushToast } = useToasts()
    const redirect = useNavigate()

    const createUser = async (formUser: FormUser) => {
        const user = {
            pseudo: formUser.pseudo.value,
            password: formUser.password.value
        }
        try {
            const response = await axios.post(`${BASE_URL}signup`, user)
            setStateAxios({ isLoading: false, data: response.data, error: null });
            redirect('/')
            pushToast('Votre compte a été créé.')
        } catch (error) {
            setStateAxios({ data: null, isLoading: false, error: error.response.data.message });
        }
    }

    return { stateAxios, createUser }
}