import { inject, Service } from '@angular/core';
import { TypeUser } from '../commun/type-user';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Service()
export class TypeUserService {
    private typeUserUrl = "http://localhost:8080/api/typeUsers";

    private httpClient = inject(HttpClient);

    getTypeUsers(): Observable<TypeUser[]> {
        return this.httpClient.get<GetResponseTypeUsers>(this.typeUserUrl).pipe(
            map(response => response._embedded.typeUsers)
        );
    }

    getTypeUsersByPagination(page: number, pageSize: number): Observable<GetResponseTypeUsers> {
        const searchUrl = `${this.typeUserUrl}` + `?page=${page - 1}&size=${pageSize}`;

        return this.httpClient.get<GetResponseTypeUsers>(searchUrl);
    }

    getTypeUser(typeUserId: number): Observable<TypeUser> {
        return this.httpClient.get<TypeUser>(`${this.typeUserUrl}/${typeUserId}`);
    }

    deleteTypeUser(typeUserId: number): Observable<TypeUser> {
        const deleteUrl = this.typeUserUrl + "/" + typeUserId;
        return this.httpClient.delete<TypeUser>(deleteUrl);
    }

    updateTypeUser(typeUser: TypeUser): Observable<TypeUser> {
        return this.httpClient.put<TypeUser>(`${this.typeUserUrl}/${typeUser.id}`, {
            typeName: typeUser.typeName
        });
    }

    addTypeUser(typeUser: NewTypeUser): Observable<TypeUser> {
        return this.httpClient.post<TypeUser>(this.typeUserUrl, {
            typeName: typeUser.typeName
        });
    }
}

interface GetResponseTypeUsers {
    _embedded: {
        typeUsers: TypeUser[]
    },
    page: {
        size: number,
        totalElements: number,
        totalPages: number,
        number: number
    }
}

interface NewTypeUser {
    typeName: string;
}