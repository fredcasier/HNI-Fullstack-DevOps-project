import e from "express";

export class User {
    id: number;
    firstName: String;
    lastName: String;
    email: String;

    constructor(
        id: number,
        firstName: String,
        lastName: String,
        email: String
    ){
        this.id = id,
        this.firstName = firstName,
        this.lastName = lastName,
        this.email = email
    }
}
