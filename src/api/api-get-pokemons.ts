import axios from "axios";
import { useState } from "react";

//GET POKEMON
export const useAxiosGetPokemons = () => {
  const [stateAxios, setStateAxios] = useState<StateAxios>({
    isLoading: true,
    data: null,
    error: null,
  });

  const getPokemons = async (url: string) => {
    try {
      const response = await axios.get(url)
      setStateAxios({
        isLoading: false,
        data: response.data,
        error: null,
      });
    } catch (error) {
      setStateAxios({
        isLoading: false,
        data: null,
        error: error,
      });
    }
  }
  return { stateAxios, getPokemons };
};