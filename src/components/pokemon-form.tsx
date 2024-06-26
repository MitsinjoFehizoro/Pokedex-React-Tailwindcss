import React, { FunctionComponent, useEffect, useState } from "react";
import Pokemon from "../models/pokemon";
import InputForm from "./input-form";
import {
    InputChecked,
    isFormValid,
    isTypesDisabled,
    validateCheckbox,
    validateFormPokemon,
} from "../tools/validation-form-pokemon";
import PokemonService from "../tools/pokemon-service";
import InputCheckBox from "./input-check-box";
import ButtonSubmit from "./button.";
import { useAxiosCreateUpdatePokemons } from "../api/use-create-update-pokemons";

type Props = {
    pokemon?: Pokemon;
};

const PokemonForm: FunctionComponent<Props> = ({ pokemon }) => {
    const [formPokemon, setFormPokemon] = useState<FormPokemon>({
        name: { value: "", isValid: false },
        hp: { value: "", isValid: false },
        cp: { value: "", isValid: false },
        types: {
            value: [],
            isValid: false,
            errorMessage: "Un pokémon doit avoir au moins un type.",
        },
    });

    useEffect(() => {
        if (pokemon) {
            setFormPokemon({
                name: { value: pokemon.name, isValid: true },
                hp: { value: pokemon.hp, isValid: true },
                cp: { value: pokemon.cp, isValid: true },
                types: { value: pokemon.types, isValid: true },
                picture: { value: pokemon.picture, isValid: true },
            });
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        validateFormPokemon(e, formPokemon, setFormPokemon);
    };

    const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        validateCheckbox(e, formPokemon, setFormPokemon)
    };

    const { stateAxios, createPokemon, updatePokemon } = useAxiosCreateUpdatePokemons(formPokemon)
    const handleOnSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (pokemon)
            updatePokemon(pokemon.id)
        else createPokemon()
    }

    return (
        <div className="mx-4 pt-6">
            <form onSubmit={handleOnSubmit} >
                <InputForm
                    label="Nom"
                    value={formPokemon?.name.value}
                    type="text"
                    name="name"
                    onChange={handleInputChange}
                    placeholder="Exemple "
                    errorMessage={formPokemon?.name.errorMessage}
                />
                <InputForm
                    label="Point de vie"
                    value={formPokemon?.hp.value}
                    type="text"
                    name="hp"
                    onChange={handleInputChange}
                    placeholder="0 à 999"
                    errorMessage={formPokemon?.hp.errorMessage}
                />
                <InputForm
                    label="Dégât"
                    value={formPokemon?.cp.value}
                    type="text"
                    name="cp"
                    onChange={handleInputChange}
                    placeholder="0 à 99"
                    errorMessage={formPokemon?.cp.errorMessage}
                />
                <InputForm
                    label="Image"
                    value={
                        formPokemon?.picture?.value ||
                        "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/xxx.png"
                    }
                    type="text"
                    name="image"
                    onChange={handleInputChange}
                    placeholder="0 à 99"
                    errorMessage={formPokemon?.picture?.errorMessage}
                />
                <p className="text-left text-slate-100 block text-sm mb-1">Types :</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-2">
                    {PokemonService.types.map((type) => (
                        <InputCheckBox
                            key={type}
                            type={type}
                            isChecked={InputChecked(type, formPokemon)}
                            onChange={handleCheckBoxChange}
                            isDisabled={!isTypesDisabled(type, formPokemon)}
                        />
                    ))}
                </div>
                {
                    !formPokemon.types.isValid && (
                        <span className="text-left pt-1 text-xs block text-red-400">
                            {formPokemon.types.errorMessage}
                        </span>
                    )
                }
                <div className="pt-5">
                    <ButtonSubmit isShowButton={isFormValid(formPokemon)} isLoading={stateAxios.isLoading} text="Valider" />
                </div>

            </form>
        </div>
    );
};
export default PokemonForm;
