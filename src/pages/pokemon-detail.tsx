import { FunctionComponent, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { h2 } from "../tools/tailwind";
import Pokemon from "../models/pokemon";
import PokemonService from "../tools/pokemon-service";
import { useAxiosDeletePokemon } from "../api/pockemon-api";
import Loading from "../components/loading";
import PageError from "./page-error";
import { useAxiosGetPokemons } from "../api/api-get-pokemons";
import { BASE_URL } from "../tools/base-url";


const PokemonDetail: FunctionComponent = () => {
    const { id } = useParams<{ id: string }>()
    const { stateAxios, getPokemons } = useAxiosGetPokemons()
    const [pokemon, setPokemon] = useState<Pokemon>()

    useEffect(() => {
        getPokemons(`${BASE_URL}pokemons/${id}`)
    }, [])
    useEffect(() => {
        setPokemon(stateAxios.data?.data)
    }, [stateAxios])

    const { stateAxiosDelete, deletePokemon } = useAxiosDeletePokemon()
    const handleClick = () => {
        if (pokemon) deletePokemon(pokemon.id)
    }

    return (
        <div className="mx-auto">
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
                pokemon ? (
                    <div className="max-w-xl mx-auto">
                        <h2 className={h2}>{pokemon.name}</h2>
                        <div className='mx-2 md:mx-0 pb-5 bg-slate-800 rounded-md ring-1 ring-gray-50/20'>
                            <div className='text-center relative'>
                                <img src={pokemon.picture} alt="" className='mx-auto' />
                                <NavLink to={`/pokemons/edit/${pokemon.id}`} className='absolute bottom-0 right-16'>
                                    <i className='fa fa-edit bg-sky-600/20 p-3 rounded-full text-slate-100 text-md transition hover:bg-sky-500/40 cursor-pointer'></i>
                                </NavLink>
                                <div className='absolute bottom-0 right-4'>
                                    {
                                        stateAxiosDelete.isLoading && (
                                            <i className="fas fa-spinner fa-spin  bg-sky-600/20 p-3 rounded-full text-slate-100 text-md cursor-wait"></i>
                                        )
                                    }
                                    {
                                        stateAxiosDelete.error && (
                                            <div>Erreur</div>
                                        )
                                    }
                                    {
                                        !stateAxiosDelete.isLoading && !stateAxiosDelete.error && (
                                            <i onClick={handleClick} className='fa fa-trash bg-sky-600/20 p-3 rounded-full text-slate-100 text-md transition hover:bg-sky-500/40 cursor-pointer'></i>
                                        )
                                    }
                                </div>
                            </div>
                            <div className='mx-4'>
                                <table className='table-auto w-full'>
                                    <LigneTable col_1='Nom' col_2={pokemon.name} />
                                    <LigneTable col_1='Poin de vie' col_2={pokemon.hp} />
                                    <LigneTable col_1='Dégât' col_2={pokemon.cp} />
                                    <tr>
                                        <td className='text-left p-2 text-slate-200'>Types </td>
                                        <td >
                                            {
                                                pokemon.types.map((type: string) => (
                                                    <span className='py-1 px-5 rounded-xl text-slate-900 mr-1' key={type} style={{ backgroundColor: PokemonService.formatType(type) }} >{type}</span>
                                                ))
                                            }
                                        </td>
                                    </tr>
                                    <LigneTable col_1='Date de création' col_2='date de création' />
                                </table>
                            </div>
                            <NavLink to='/' className='ml-6 mt-2 bg-sky-600/20 w-36 text-center text-slate-300 block p-1 rounded-md hover:bg-sky-500/40 transition'>
                                <i className='fa fa-arrow-left'></i>
                                <span className='pl-1'>Retour</span>
                            </NavLink>
                        </div>
                    </div>
                ) : (
                    <div>Aucun pokémon à afficer.</div>
                )

            }
        </div >
    )
}

type Props = {
    col_1: string | number,
    col_2: string | number | null
}
const LigneTable: FunctionComponent<Props> = ({ col_1, col_2 }) => {
    return (
        <tr>
            <td className='text-left p-2 text-slate-200'>{col_1}</td>
            <td className='text-right text-slate-300'>{col_2}</td>
        </tr>
    )
}
export default PokemonDetail