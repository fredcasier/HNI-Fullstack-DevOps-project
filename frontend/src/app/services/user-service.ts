import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../commun/user';
import { response } from 'express';

@Service()
export class UserService {

    private userUrl = "http://localhost:8080/api/users";
    private typeUserUrl = "http://localhost:8080/api/typeUsers";

    private httpClient = inject(HttpClient);

    getUsers(): Observable<User[]> {
        return this.httpClient.get<GetResponseUsers>(this.userUrl).pipe(
            map(response => response._embedded.users)
        );
    }

    deleteUser(userId: number): Observable<User> {
        const deleteUrl = this.userUrl + "/" + userId;
        return this.httpClient.delete<User>(deleteUrl);
    }

    addUser(user: NewUser): Observable<User> {
        return this.httpClient.post<User>(this.userUrl, {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            typeUser: `${this.typeUserUrl}/${user.typeUser.id}`
        });
    }
}

interface GetResponseUsers {
    _embedded:{
            users: User[]
        }
}

interface NewUser {
    firstName: string;
    lastName: string;
    email: string;
    typeUser: { id: number };
}