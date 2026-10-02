import { inject, Service } from '@angular/core';
import { TypeUser } from '../commun/type-user';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Service()
export class TypeUserService {
    private typeUserUrl = "http://localhost:8080/api/typeUsers";

    private httpClient = inject(HttpClient);

    getUsers(): Observable<TypeUser[]> {
        return this.httpClient.get<GetResponseTypeUsers>(this.typeUserUrl).pipe(
            map(response => response._embedded.typeUsers)
        );
    }
}

interface GetResponseTypeUsers {
    _embedded: {
        typeUsers: TypeUser[]
    }
}