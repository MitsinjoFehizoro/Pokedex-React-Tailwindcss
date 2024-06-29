type Champ = {
  value?: string | number | string[];
  errorMessage?: string;
  isValid?: boolean;
};

type StateAxios = {
  isLoading: boolean;
  data?: any;
  error?: any;
};

type FormPokemon = {
  picture?: Champ,
  name: Champ,
  hp: Champ,
  cp: Champ,
  types: Champ
}

type FormUser = {
  pseudo: Champ,
  password: Champ,
  confirmPassword?: Champ
}
