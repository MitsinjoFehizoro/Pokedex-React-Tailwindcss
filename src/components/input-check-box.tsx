import { FunctionComponent } from "react";
import PokemonService from "../tools/pokemon-service";

type Props = {
    type: string,
    isChecked: boolean,
    isDisabled : boolean,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputCheckBox: FunctionComponent<Props> = ({ type, isChecked, isDisabled ,onChange }) => {

    return (
        <span key={type} className="text-left">
            <input
                type="checkbox"
                checked={isChecked}
                name="checkbox"
                id={type}
                value={type}
                className="cursor-pointer"
                onChange={onChange}
                disabled={isDisabled}
            />
            <label htmlFor={type} className="py-1 px-5 rounded-xl text-slate-900 ml-1 cursor-pointer" style={{ backgroundColor: PokemonService.formatType(type) }} >
                <span>{type}</span>
            </label>
        </span>
    )
}

export default InputCheckBox