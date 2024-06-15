import React from "react";

const regexName = /^[a-zA-Zçéèàëïùôû]{3,15}$/;
const regexHp = /^[0-9]{1,3}$/;
const regexCp = /^[0-9]{1,2}$/;
const regexImage =
  /^https:\/\/assets\.pokemon\.com\/assets\/cms2\/img\/pokedex\/detail\/[0-9]{3}\.png$/;

export const validateFormPokemon = (
  e: React.ChangeEvent<HTMLInputElement>,
  formPokemon: FormPokemon,
  setFormPokemon: (f: FormPokemon) => void
) => {
  switch (e.target.name) {
    case "name": {
      if (regexName.test(e.target.value)) {
        const champ: Champ = { value: e.target.value, isValid: true };
        setFormPokemon({ ...formPokemon, name: champ });
      } else {
        const errorMessage = "Le nom doit entre 3-15 sans caractères spéciaux.";
        const champ: Champ = {
          value: e.target.value,
          isValid: false,
          errorMessage: errorMessage,
        };
        setFormPokemon({ ...formPokemon, name: champ });
      }
      break;
    }
    case "hp": {
      if (regexHp.test(e.target.value)) {
        const champ: Champ = { value: e.target.value, isValid: true };
        setFormPokemon({ ...formPokemon, hp: champ });
      } else {
        const errorMessage = "Le point de vie est entre 0-999.";
        const champName: Champ = {
          value: e.target.value,
          isValid: false,
          errorMessage: errorMessage,
        };
        setFormPokemon({ ...formPokemon, hp: champName });
      }
      break;
    }
    case "cp": {
      if (regexCp.test(e.target.value)) {
        const champ: Champ = { value: e.target.value, isValid: true };
        setFormPokemon({ ...formPokemon, cp: champ });
      } else {
        const errorMessage = "Le dégât est entre 0-99.";
        const champName: Champ = {
          value: e.target.value,
          isValid: false,
          errorMessage: errorMessage,
        };
        setFormPokemon({ ...formPokemon, cp: champName });
      }
      break;
    }
    case "image": {
      if (regexImage.test(e.target.value)) {
        const champ: Champ = { value: e.target.value, isValid: true };
        setFormPokemon({ ...formPokemon, picture: champ });
      } else {
        const errorMessage =
          "Ex : https://assets.pokemon.com/assets/cms2/img/pokedex/detail/005.png";
        const champName: Champ = {
          value: e.target.value,
          isValid: false,
          errorMessage: errorMessage,
        };
        setFormPokemon({ ...formPokemon, picture: champName });
      }
      break;
    }
  }
};

export const InputChecked = (
  type: string,
  formPokemon: FormPokemon
): boolean => {
  let retour: boolean = false;
  if (formPokemon.types.value instanceof Array) {
    retour = formPokemon.types.value.includes(type);
  }
  return retour;
};

export const isTypesDisabled = (
  type: string,
  formPokemon: FormPokemon
): boolean => {
  let retour: boolean = true;
  if (formPokemon.types.value instanceof Array) {
    if (formPokemon.types.value.length >= 3) {
      retour = formPokemon.types.value.includes(type);
    }
  }
  return retour;
};


export const validateCheckbox = (
  e: React.ChangeEvent<HTMLInputElement>,
  formPokemon: FormPokemon,
  setFormPokemon: (f: FormPokemon) => void
) => {
  let types = formPokemon.types.value;
  let isValid: boolean = false
  if (types instanceof Array) {
    if (e.target.checked) {
      types.push(e.target.value)
    } else types = types.filter((s: string) => s !== e.target.value)

    if (types.length <= 0) {
      isValid = false
    } else {
      isValid = true
    }
  }

  setFormPokemon({ ...formPokemon, types: { ...formPokemon.types, value: types, isValid: isValid } });
};

export const isFormValid = (formPokemon: FormPokemon) => {
  let isValid: boolean = false
  if (formPokemon.cp.isValid === true && formPokemon.hp.isValid === true && formPokemon.name.isValid === true && formPokemon.picture?.isValid === true && formPokemon.types.isValid === true) {
    isValid = true
  }
  return isValid
}
