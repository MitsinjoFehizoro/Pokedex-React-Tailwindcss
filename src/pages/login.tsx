import React, { FunctionComponent, useState } from "react";
import { h2 } from "../tools/tailwind";
import InputForm from "../components/input-form";
import ButtonSubmit from "../components/button.";
import { isShowButton, validationFormUser } from "../tools/validation-form-user";
import { useAuth } from "../api/users-api/use-auth";
import { FormUser } from "../tools/type";

const Login: FunctionComponent = () => {
    const [formUser, setFormUser] = useState<FormUser>({
        pseudo: { value: '', isValid: false },
        password: { value: '', isValid: false }
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        validationFormUser(e, formUser, setFormUser)
    }

    const { isAuth, login, user, stateAxiosAuth } = useAuth()
    const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        login(formUser)
    } 
    return (
        <div className='mx-auto'>
            <div className="max-w-lg mx-auto">
                <h2 className={h2}>Se connecter : </h2>
                <div className="mx-2 md:mx-0 pb-5 bg-slate-800 rounded-md ring-1 ring-gray-50/20">
                    <div className="mx-4 pt-6">
                        <form onSubmit={onSubmit}>
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
                            <div className="mt-6">
                                <ButtonSubmit
                                    isShowButton={isShowButton(formUser)}
                                    isLoading={false}
                                    text="Se connecter"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login