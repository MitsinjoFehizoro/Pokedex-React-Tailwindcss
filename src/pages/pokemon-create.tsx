import { FunctionComponent } from "react";
import { h2 } from "../tools/tailwind";
import PokemonForm from "../components/pokemon-form";

const CreatePokemon: FunctionComponent = () => {
    return (
        <div className='mx-auto'>
            <div className="max-w-xl mx-auto">
                <h2 className={h2}>Ajouter un pokémon : </h2>
                <div className="mx-2 md:mx-0 pb-5 bg-slate-800 rounded-md ring-1 ring-gray-50/20">
                    <div className="mx-2">
                        <PokemonForm />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CreatePokemon