import axios from "axios";
import { useState } from "react";
import { StateAxios } from "../../tools/type";

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
      setStateAxios({ isLoading: false, data: response.data, error: null });
    } catch (error) {
      setStateAxios({ data: null, isLoading: false, error: error });
    }
  }
  return { stateAxios, getPokemons };
};