import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToasts } from "../hooks/useToasts";

//CREATE et DELETE POKEMON
export const useAxiosPokemon = (formPokemon: FormPokemon) => {
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

  const { pushToast } = useToasts();
  const redirect = useNavigate()

  const createPokemon = async () => {
    setStateAxios({ ...stateAxios, isLoading: true });
    await axios
      .post("http://localhost:5174/pokemons", pokemon)
      .then(() => {
        //misy response raha vrai api
        redirect("/");
        pushToast("Ajout avec succès.");
      })
      .catch((error) => {
        setStateAxios({ ...stateAxios, isLoading: false, error: error });
      });
  };

  const updatePokemon = async (id: number) => {
    setStateAxios({ ...stateAxios, isLoading: true });
    await axios
      .put(`http://localhost:5174/pokemons/${id}`, pokemon)
      .then(() => {
        redirect(`/pokemons/${id}`)
        pushToast("Modification avec succès.")
      })
      .catch((error) => {
        setStateAxios({ ...stateAxios, isLoading: false, error: error });
      });
  }

  return { stateAxios, createPokemon, updatePokemon };
};

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
