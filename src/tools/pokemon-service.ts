export default class PokemonService {
  static types = [
    "Feu",
    "Eau",
    "Plante",
    "Insecte",
    "Normal",
    "Vol",
    "Poison",
    "Fée",
    "Psy",
    "Electrik",
    "Combat",
    "Red",
  ];
  static formatType = (type: string): string => {
    let color: string;
    switch (type) {
      case "Feu":
        color = "#ef2547";
        break;
      case "Eau":
        color = "pink";
        break;
      case "Plante":
        color = "#ae8795";
        break;
      case "Insecte":
        color = "#f154a5";
        break;
      case "Normal":
        color = "#a2a7ff";
        break;
      case "Vol":
        color = "#2578fa";
        break;
      case "Poison":
        color = "#258a8a";
        break;
      case "Fée":
        color = "#acefbe";
        break;
      case "Psy":
        color = "#009866";
        break;
      case "Electrik":
        color = "grey";
        break;
      case "Combat":
        color = "orange";
        break;
      default:
        color = "red";
        break;
    }
    return color;
  };

  static formatDate = (date: Date): string => {
    return `${date.getDay()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };
}
