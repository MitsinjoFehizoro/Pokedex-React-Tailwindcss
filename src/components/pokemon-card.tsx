import { FunctionComponent, useState } from "react";
import Pokemon from "../models/pokemon";
import PokemonService from "../tools/pokemon-service";
import { useNavigate } from "react-router-dom";

type Props = {
    pokemon: Pokemon
}
const PokemonCard: FunctionComponent<Props> = ({ pokemon }) => {

    const [borderColor, setBorderColor] = useState<string>('#646464')
    const showBorder = () => {
        setBorderColor("#009688")
    }
    const hideBorder = () => {
        setBorderColor("#646464")
    }

    const newRoute = useNavigate()
    const goToPokemonDetail = (id: number) => {
        newRoute(`/pokemons/${id}`)
    }

    return (
        <div
            className="flex bg-slate-800  rounded-md md:w-full sm:w-96 cursor-grab transition duration-1000 hover:ring-gray-50/40 hover:bg-slate-700"
            onMouseEnter={showBorder}
            onMouseLeave={hideBorder}
            onClick={() => goToPokemonDetail(pokemon.id)}
            style={{ borderColor: borderColor, borderWidth: ".5px" }}
        >
            <img src={pokemon.picture} className="w-1/2" alt="" />
            <div className="py-2">
                <h5 className="text-slate-200 font-bold text-xl">{pokemon.name}</h5>
                <p className="text-slate-400 text-sm pb-5"></p>
                {
                    pokemon.types.map(type => (
                        <span key={type} className="block mb-2">
                            <span style={{ backgroundColor: PokemonService.formatType(type) }} className="py-1 px-5 rounded-xl text-slate-900">{type}</span>
                        </span>
                    ))
                }
            </div>
        </div>
    )
}
export default PokemonCard
