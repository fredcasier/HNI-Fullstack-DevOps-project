import { Routes } from '@angular/router';
import { UserList } from './components/user-list/user-list';
import { TypeUserList } from './components/type-user-list/type-user-list';

export const routes: Routes = [
    {
        path: '',
        component: UserList,
    },
    {
        path: 'users',
        component: UserList,
    },
    {
        path: 'types',
        component: TypeUserList
    }
];
