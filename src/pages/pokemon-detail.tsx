import { FunctionComponent, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { h2 } from "../tools/tailwind";
import Pokemon from "../models/pokemon";
import PokemonService from "../tools/pokemon-service";
import Loading from "../components/loading";
import PageError from "./page-error";
import { BASE_URL } from "../tools/base-url";
import { useAxiosDeletePokemons } from "../api/pokemons-api/use-delete-pokemons";
import { useAxiosGetPokemons } from "../api/pokemons-api/use-get-pokemons";
import { useAuth } from "../api/users-api/use-auth";


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

    const { stateAxiosDelete, deletePokemon } = useAxiosDeletePokemons()
    const { isAuth } = useAuth()
    const navigate = useNavigate()
    const handleClick = () => {
        if (isAuth) {
            if (pokemon) deletePokemon(pokemon.id)
        } else
            navigate("/login", { state: { from: location.pathname } })
    }

    return (
        <div className="mx-auto">
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
                pokemon && (
                    <div className="max-w-xl mx-auto">
                        <h2 className={h2}>{pokemon.name}</h2>
                        <div className='mx-6 md:mx-0 pb-5 bg-slate-800 rounded-md ring-1 ring-gray-50/20'>
                            <div className='text-center relative'>
                                <img src={pokemon.picture} alt="" className='mx-auto' />
                                <NavLink to={`/pokemons/edit/${pokemon.id}`} className='absolute top-48 sm:top-44 right-16'>
                                    <i className='fa fa-edit bg-sky-600/20 p-3 rounded-full text-slate-100 text-md transition hover:bg-sky-500/40 cursor-pointer'></i>
                                </NavLink>
                                <div className='absolute top-48 sm:top-44 right-4'>
                                    {
                                        stateAxiosDelete.isLoading && (
                                            <i className="fas fa-spinner fa-spin  bg-sky-600/20 p-3 rounded-full text-slate-100 text-md cursor-wait"></i>
                                        )
                                    }
                                    {
                                        !stateAxiosDelete.isLoading && (
                                            <i onClick={handleClick} className='fa fa-trash bg-sky-600/20 p-3 rounded-full text-slate-100 text-md transition hover:bg-sky-500/40 cursor-pointer'></i>
                                        )
                                    }
                                </div>
                            </div>
                            <div className='mx-4 mt-2'>
                                <LigneTable col_1='Nom :' col_2={pokemon.name} />
                                <LigneTable col_1='Point de vie :' col_2={pokemon.hp} />
                                <LigneTable col_1='Dégât :' col_2={pokemon.cp} />
                                <div className="w-full sm:flex">
                                    <div className='text-left p-2 text-slate-200 sm:w-1/2'>Types :</div>
                                    <div className=" text-left pl-2 pb-4 sm:text-right sm:p-0 text-slate-300 sm:w-1/2" >
                                        {
                                            pokemon.types.map((type: string) => (
                                                <span className='py-1 px-5 rounded-xl text-slate-900 mr-1' key={type} style={{ backgroundColor: PokemonService.formatType(type) }} >{type}</span>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <NavLink to='/' className='ml-6 mt-2 bg-sky-600/20 w-36 text-center text-slate-300 block p-1 rounded-md hover:bg-sky-500/40 hover:text-slate-300 transition'>
                                <i className='fa fa-arrow-left'></i>
                                <span className='pl-1'>Retour</span>
                            </NavLink>
                        </div>
                    </div>
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
        <div className="w-full sm:flex">
            <div className='text-left p-2 text-slate-200 sm:w-1/2'>{col_1}</div>
            <div className=' text-left pl-2 pb-4 sm:text-right sm:p-2 text-slate-300 sm:w-1/2'>{col_2}</div>
        </div>
    )
}
export default PokemonDetail