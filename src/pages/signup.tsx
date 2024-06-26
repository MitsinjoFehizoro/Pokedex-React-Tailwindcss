import React, { FunctionComponent, useEffect, useState } from "react";
import { h2 } from "../tools/tailwind";
import InputForm from "../components/input-form";
import { isShowButton, validationFormUser } from "../tools/validation-form-user";
import ButtonSubmit from "../components/button.";

const Signup: FunctionComponent = () => {
    const [formUser, setFormUser] = useState<FormUser>({
        pseudo: { value: "", isValid: false },
        password: { value: "", isValid: false },
        confirmPassword: { value: "", isValid: false },
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        validationFormUser(e, formUser, setFormUser)
    }
    return (
        <div className='mx-auto'>
            <div className="max-w-lg mx-auto">
                <h2 className={h2}>Créer un compte : </h2>
                <div className="mx-2 md:mx-0 pb-5 bg-slate-800 rounded-md ring-1 ring-gray-50/20">
                    <div className="mx-4 pt-6">
                        <form action="">
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
                                value={formUser?.confirmPassword.value}
                                onChange={handleChange}
                                errorMessage={formUser?.confirmPassword.errorMessage}
                                placeholder=""
                            />
                            <div className="mt-6">
                                <ButtonSubmit
                                    isShowButton={isShowButton(formUser)}
                                    isLoading={false}
                                    text="S'inscrire"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup