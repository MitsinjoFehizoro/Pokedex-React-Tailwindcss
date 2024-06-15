import { FunctionComponent } from "react";
import { h2 } from "../tools/tailwind";
import PokemonForm from "../components/pokemon-form";

import { useAxiosGetPokemons } from "../api/pockemon-api";
import Pokemon from "../models/pokemon";
import Loading from "../components/loading";
import PageError from "./page-error";
import { useParams } from "react-router-dom";

const UpdatePokemon: FunctionComponent = () => {
    const { id } = useParams()
    const { stateAxios } = useAxiosGetPokemons(`http://localhost:5174/pokemons/${id}`)
    const pokemon: Pokemon = stateAxios.data
    return (
        <div className='mx-auto'>
            <div className="max-w-xl mx-auto">
                {
                    stateAxios.isLoading && (
                        <Loading />
                    )
                }
                {
                    stateAxios.error && (
                        <PageError error={stateAxios.error.toString()} />
                    )
                }
                {
                    pokemon && (
                        <>
                            <h2 className={h2}>Modifier un pokémon : </h2>
                            <div className="mx-2 md:mx-0 pb-5 bg-slate-800 rounded-md ring-1 ring-gray-50/20">
                                <div className="mx-2">
                                    <PokemonForm pokemon={pokemon} />
                                </div>
                            </div>
                        </>
                    )
                }

            </div>
        </div>
    )
}
export default UpdatePokemon