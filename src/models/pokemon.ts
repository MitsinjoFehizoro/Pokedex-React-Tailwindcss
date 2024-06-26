export default class Pokemon {
  id: number;
  hp: number;
  cp: number;
  name: string;
  picture: string;
  types: Array<string>;

  constructor(
    id: number,
    hp: number,
    cp: number,
    name: string,
    picture: string = "http://...",
    types: Array<string>
  ) {
    this.id = id;
    this.hp = hp;
    this.cp = cp;
    this.name = name
    this.picture = picture
    this.types = types
  }
}
