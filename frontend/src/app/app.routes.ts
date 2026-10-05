import { Routes } from '@angular/router';
import { UserList } from './components/user-list/user-list';
import { TypeUserList } from './components/type-user-list/type-user-list';
import { UserForm } from './components/user-form/user-form';
import { TypeUserForm } from './components/type-user-form/type-user-form';
import { UserDetails } from './components/user-details/user-details';
import { TypeUserDetails } from './components/type-user-details/type-user-details';

export const routes: Routes = [
    { path: '', component: UserList },
    { path: 'users', component: UserList },
    { path: 'types', component: TypeUserList },
    { path: 'user-form', component: UserForm },
    { path: 'user-form/:id', component: UserForm },
    { path: 'type-form', component: TypeUserForm },
    { path: 'type-form/:id', component: TypeUserForm },
    { path: 'user-details/:id', component: UserDetails},
    { path: 'type-details/:id', component: TypeUserDetails}
];
