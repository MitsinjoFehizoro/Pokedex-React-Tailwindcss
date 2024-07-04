import { StateAxios } from './../../tools/type';
import axios from "axios";
import { useState } from "react";
//GET POKEMON
export const useAxiosGetPokemons = () => {
  const [stateAxios, setStateAxios] = useState<StateAxios>({
    isLoading: false,
    data: null,
    error: null,
  });

  const getPokemons = async (url: string) => {
    try {
      setStateAxios({ ...stateAxios, isLoading: true })
      const response = await axios.get(url)
      setStateAxios({ isLoading: false, data: response.data, error: null });
    } catch (error) {
      setStateAxios({ data: null, isLoading: false, error: error });
    }
  }
  return { stateAxios, getPokemons };
};