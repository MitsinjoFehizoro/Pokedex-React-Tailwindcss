import { useState } from "react";
import { useToasts } from "../../hooks/useToasts";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../tools/base-url";
import { FormPokemon, StateAxios } from "../../tools/type";

export const useAxiosCreateUpdatePokemons = (formPokemon: FormPokemon) => {
    const [stateAxios, setStateAxios] = useState<StateAxios>({
        isLoading: false,
        data: null,
        error: null,
    });

    const pokemon = {
        name: formPokemon.name.value,
        hp: formPokemon.hp.value,
        cp: formPokemon.cp.value,
        picture: formPokemon.picture?.value,
        types: formPokemon.types.value,
    };

    const { pushToast } = useToasts()
    const navigate = useNavigate()

    const createPokemon = async () => {
        try {
            setStateAxios({ ...stateAxios, isLoading: true })
            const response = await axios.post(`${BASE_URL}pokemons`, pokemon)
            setStateAxios({ isLoading: false, data: response.data, error: null });
            navigate('/')
            pushToast("Ajout avec succès.");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                pushToast(error.response?.data.message, true)
                setStateAxios({ data: null, isLoading: false, error: error.response?.data.message });
            } else
                setStateAxios({ data: null, isLoading: false, error: error });
        }
    }

    const updatePokemon = async (id: number) => {
        try {
            await axios.put(`${BASE_URL}pokemons/${id}`, pokemon)
            navigate(`/pokemons/${id}`)
            pushToast("Modification avec succès.")
        } catch (error) {
            if (axios.isAxiosError(error)) {
                pushToast(error.response?.data.message, true)
                setStateAxios({ data: null, isLoading: false, error: error.response?.data.message });
            } else
                setStateAxios({ data: null, isLoading: false, error: error });
        }
    }

    return {
        stateAxios, createPokemon, updatePokemon
    }
}