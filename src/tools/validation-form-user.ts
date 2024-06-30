import React from "react";
import { regexName, regexPassword } from "./regex";
import { Champ, FormUser } from "./type";

export const validationFormUser = (e: React.ChangeEvent<HTMLInputElement>, formUser: FormUser, setFormUser: (f: FormUser) => void) => {
    switch (e.target.name) {
        case "pseudo": {
            if (regexName.test(e.target.value)) {
                const champ: Champ = {
                    value: e.target.value,
                    isValid: true,
                }
                setFormUser({ ...formUser, pseudo: champ })
            } else {
                const errorMessage = "Le pseudo doit entre 3 à 15 sans caractères spéciaux."
                const champ: Champ = {
                    value: e.target.value,
                    isValid: false,
                    errorMessage: errorMessage
                }
                setFormUser({ ...formUser, pseudo: champ })
            }
            break
        }
        case "password": {
            if (regexPassword.test(e.target.value)) {
                const champ: Champ = {
                    value: e.target.value,
                    isValid: true,
                }
                setFormUser({ ...formUser, password: champ })
            } else {
                const errorMessage = "Le mot de passe doit contenir au moins 4 caractères."
                const champ: Champ = {
                    value: e.target.value,
                    isValid: false,
                    errorMessage: errorMessage
                }
                setFormUser({ ...formUser, password: champ })
            }
            break
        }
        case "confirmPassword": {
            if (e.target.value === formUser.password.value) {
                const champ: Champ = {
                    value: e.target.value,
                    isValid: true,
                }
                setFormUser({ ...formUser, confirmPassword: champ })
            } else {
                const errorMessage = "Mot de passe non confirmé."
                const champ: Champ = {
                    value: e.target.value,
                    isValid: false,
                    errorMessage: errorMessage
                }
                setFormUser({ ...formUser, confirmPassword: champ })
            }
        }
    }
}


export const isDisableButton = (formUser: FormUser) => {
    let isValid: boolean = true
    if (formUser.pseudo.isValid && formUser.password.isValid && (!formUser.confirmPassword || formUser.confirmPassword.isValid)) isValid = false
    return isValid
}