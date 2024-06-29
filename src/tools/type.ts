export type Champ = {
  value?: string | number | string[];
  errorMessage?: string;
  isValid?: boolean;
};

export type StateAxios = {
  isLoading: boolean;
  data?: any;
  error?: any;
};

export type FormPokemon = {
  picture?: Champ,
  name: Champ,
  hp: Champ,
  cp: Champ,
  types: Champ
};

export type FormUser = {
  pseudo: Champ,
  password: Champ,
  confirmPassword?: Champ
}
