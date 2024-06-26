import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToasts } from "../hooks/useToasts";


//GET POKEMON
export const useAxiosDeletePokemon = () => {
  const [stateAxiosDelete, setStateAxiosDelete] = useState<StateAxios>({
    isLoading: false,
    data: null,
    error: null,
  });

  const { pushToast } = useToasts();
  const redirect = useNavigate()

  const deletePokemon = async (id: number) => {
    setStateAxiosDelete({ ...stateAxiosDelete, isLoading: true });
    await axios
      .delete(`http://localhost:5174/pokemons/${id}`)
      .then(() => {
        redirect("/")
        pushToast("Suppression avec succès.")
      })
      .catch((error) => {
        setStateAxiosDelete({ ...stateAxiosDelete, isLoading: false, error: error });
      });
  }


  return { stateAxiosDelete, deletePokemon };
};
