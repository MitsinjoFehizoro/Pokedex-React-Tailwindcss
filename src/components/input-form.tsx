import { FunctionComponent } from "react";

type Props = {
    label: string,
    type: string,
    name: string,
    value: any,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    errorMessage?: string | undefined,
    placeholder?: string
}
const InputForm: FunctionComponent<Props> = ({ label, type, name, value, onChange, errorMessage, placeholder }) => {
    return (
        <div className='mb-3  relative'>
            <label className='text-left text-slate-100 block text-sm mb-1'>{label}</label>
            <input
                className='bg-slate-900 ring-0 ring-gray-50/10 w-full p-2 rounded-md text-sm text-slate-400 outline-none focus:shadow focus:shadow-slate-600'
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
            {
                errorMessage && <span className='text-left pt-1 text-xs block text-red-400'>{errorMessage}</span>
            }
        </div>
    )
}
export default InputForm