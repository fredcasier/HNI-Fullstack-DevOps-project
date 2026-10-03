import { TypeUser } from "./type-user";

export class User {
    id: number;
    firstName: String;
    lastName: String;
    email: String;
    typeUser: TypeUser;

    constructor(
        id: number,
        firstName: String,
        lastName: String,
        email: String,
        typeUser: TypeUser
    ){
        this.id = id,
        this.firstName = firstName,
        this.lastName = lastName,
        this.email = email,
        this.typeUser = typeUser
    }
}
