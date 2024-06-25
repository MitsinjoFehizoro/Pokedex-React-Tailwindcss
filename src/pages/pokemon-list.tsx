import { FunctionComponent, useEffect, useRef, useState } from "react";
import { h2 } from "../tools/tailwind";
import PokemonCard from "../components/pokemon-card";
import Loading from "../components/loading";
import PageError from "./page-error";
import Pokemon from "../models/pokemon";
import { useAxiosGetPokemons } from "../api/pockemon-api";

const PokemonList: FunctionComponent = () => {
    const { stateAxios } = useAxiosGetPokemons('http://localhost:5174/pokemons')
    const [pokemons, setPokemons] = useState<Pokemon[]>()
    const [a, setA] = useState<number>(0)

    const previousDataRef = useRef(null);

    useEffect(() => {
        if (stateAxios.data && stateAxios.data !== previousDataRef.current) {
            setPokemons(stateAxios.data.data);
            console.log(stateAxios.data.message);
            previousDataRef.current = stateAxios.data;
            setA(prevA => prevA + 1);
        }
    }, [stateAxios.data]);
    
    return (
        <div className=" mx-auto container xl:w-9/12 relative">
            {
                stateAxios.isLoading && (
                    <Loading />
                )
            }
            {
                stateAxios.error !== null ?? (
                    <PageError error={stateAxios.error.toString()} />
                )
            }
            {
                pokemons && (
                    <div>
                        {a}
                        <div className="text-slate-100">
                            <h2 className={h2}>Listes des pokémons : </h2>
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