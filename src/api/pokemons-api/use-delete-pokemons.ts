import { useState } from "react";
import { useToasts } from "../../hooks/useToasts";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../tools/base-url";

export const useAxiosDeletePokemons = () => {
    const [stateAxiosDelete, setStateAxiosDelete] = useState<StateAxios>({
        isLoading: false,
        data: null,
        error: null,
    });

    const { pushToast } = useToasts()
    const redirect = useNavigate()

    const deletePokemon = async (id: number) => {
        try {
            const response = await axios.delete(`${BASE_URL}pokemons/${id}`)
            setStateAxiosDelete({ isLoading: false, data: response.data, error: null });
            redirect('/')
            pushToast("Suppression avec succès.");
        } catch (error) {
            setStateAxiosDelete({ data: null, isLoading: false, error: error });
        }
    }

    return {
        stateAxiosDelete, deletePokemon
    }
}