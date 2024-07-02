import React, { FunctionComponent, useState } from "react";
import { h2 } from "../tools/tailwind";
import InputForm from "../components/input-form";
import { isDisableButton, validationFormUser } from "../tools/validation-form-user";
import ButtonSubmit from "../components/button.";
import { useAxiosCreateUsers } from "../api/users-api/use-create-users";
import { FormUser } from "../tools/type";
import { NavLink } from "react-router-dom";

const Signup: FunctionComponent = () => {
    const [formUser, setFormUser] = useState<FormUser>({
        pseudo: { value: "", isValid: false },
        password: { value: "", isValid: false },
        confirmPassword: { value: "", isValid: false },
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        validationFormUser(e, formUser, setFormUser)
    }

    const { stateAxios, createUser } = useAxiosCreateUsers()
    const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        createUser(formUser)
    }

    return (
        <div className="max-w-md mx-auto">
            <h2 className={h2}>Créer un compte : </h2>
            <div className="mx-2 md:mx-0 pb-5 bg-slate-800 rounded-md ring-1 ring-gray-50/20">
                <div className="mx-4 pt-6">
                    <form onSubmit={onSubmit} >
                        <InputForm
                            label="Pseudo :"
                            type="text"
                            name="pseudo"
                            value={formUser?.pseudo.value}
                            onChange={handleChange}
                            errorMessage={formUser?.pseudo.errorMessage}
                            placeholder=""
                        />
                        <InputForm
                            label="Mot de passe :"
                            type="password"
                            name="password"
                            value={formUser?.password.value}
                            onChange={handleChange}
                            errorMessage={formUser?.password.errorMessage}
                            placeholder=""
                        />
                        <InputForm
                            label="Confirmé le mot de passe :"
                            type="password"
                            name="confirmPassword"
                            value={formUser?.confirmPassword?.value}
                            onChange={handleChange}
                            errorMessage={formUser?.confirmPassword?.errorMessage}
                            placeholder=""
                        />
                        <div className="mt-6 mb-4">
                            <ButtonSubmit
                                isDisable={isDisableButton(formUser)}
                                isLoading={stateAxios.isLoading}
                                text="S'inscrire"
                            />
                        </div>
                        <NavLink to={'/login'} className='text-sm underline'>Avez-vous déja  un compte ?</NavLink>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup