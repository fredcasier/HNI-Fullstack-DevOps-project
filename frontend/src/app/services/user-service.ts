import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../commun/user';

@Service()
export class UserService {

    private userUrl = "http://localhost:8080/api/users";

    private httpClient = inject(HttpClient);

    getUsers(): Observable<User[]> {
        return this.httpClient.get<GetResponseUsers>(this.userUrl).pipe(
            map(response => response._embedded.users)
        );
    }
}

interface GetResponseUsers {
    _embedded:{
            users: User[]
        }
}
