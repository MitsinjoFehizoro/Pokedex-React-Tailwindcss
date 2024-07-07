import React, { FunctionComponent, useEffect, useState } from "react";
import { h2 } from "../tools/tailwind";
import PokemonCard from "../components/pokemon-card";
import Loading from "../components/loading";
import PageError from "./page-error";
import Pokemon from "../models/pokemon";
import { BASE_URL } from "../tools/base-url";
import { useAxiosGetPokemons } from "../api/pokemons-api/use-get-pokemons";

const PokemonList: FunctionComponent = () => {
    const { stateAxios, getPokemons } = useAxiosGetPokemons()
    const [pokemons, setPokemons] = useState<Pokemon[]>()

    useEffect(() => {
        getPokemons(`${BASE_URL}pokemons`)
    }, []);
    useEffect(() => {
        setPokemons(stateAxios.data?.data)
    }, [stateAxios])

    //Recherche
    const [search, setSearch] = useState<string>('')
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }
    useEffect(() => {
        const pokemons: Pokemon[] = stateAxios.data?.data || []
        setPokemons(pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(search)));
    }, [search])

    return (
        <div className=" mx-auto container xl:w-9/12 relative">
            {
                stateAxios.isLoading && (
                    <Loading />
                )
            }
            {
                stateAxios.error && (
                    <PageError />
                )
            }
            {
                pokemons && (
                    <div className="min-h-screen">
                        <div className="flex justify-center text-slate-100">
                            <h2 className={h2}>Listes des pokémons :</h2>
                            <form>
                                <input
                                    className="mt-2 px-2 bg-slate-900 outline-none border-b"
                                    placeholder="recherche..."
                                    value={search}
                                    onChange={handleChange}
                                    type="text" name="search" id="search" />
                                <i className="fa fa-search"></i>
                            </form>
                        </div>
                        <div className="grid place-content-center gap-4 lg:grid-cols-3 md:grid-cols-2 " >
                            {
                                pokemons.map(pokemon => (
                                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}
export default PokemonList