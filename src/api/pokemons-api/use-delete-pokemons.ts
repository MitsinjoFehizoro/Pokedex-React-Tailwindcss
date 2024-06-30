import { useState } from "react";
import { useToasts } from "../../hooks/useToasts";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../tools/base-url";
import { StateAxios } from "../../tools/type";

export const useAxiosDeletePokemons = () => {
    const [stateAxiosDelete, setStateAxiosDelete] = useState<StateAxios>({
        isLoading: false,
        data: null,
        error: null,
    });

    const { pushToast } = useToasts()
    const navigate = useNavigate()

    const deletePokemon = async (id: number) => {
        try {
            setStateAxiosDelete({ ...stateAxiosDelete, isLoading: true })
            const response = await axios.delete(`${BASE_URL}pokemons/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            setStateAxiosDelete({ isLoading: false, data: response.data, error: null });
            navigate('/')
            pushToast("Suppression avec succès.");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                pushToast(error.response?.data.message, true)
                setStateAxiosDelete({ data: null, isLoading: false, error: error.response?.data.message });
            } else
                setStateAxiosDelete({ data: null, isLoading: false, error: error });
        }
    }

    return {
        stateAxiosDelete, deletePokemon
    }
}