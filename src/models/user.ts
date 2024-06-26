export default class User {
    id: number
    pseudo: string
    password: string

    constructor(
        id: number,
        pseudo: string,
        password: string
    ) {
        this.id = id
        this.pseudo = pseudo
        this.password = password
    }
}