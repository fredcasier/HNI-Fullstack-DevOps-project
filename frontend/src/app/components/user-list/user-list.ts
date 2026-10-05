import { Component, signal } from '@angular/core';
import { User } from '../../commun/user';
import { UserService } from '../../services/user-service';
import { RouterLink } from '@angular/router';
import { TypeUser } from '../../commun/type-user';
import { TypeUserService } from '../../services/type-user-service';

@Component({
  imports: [RouterLink],
  selector: 'app-user-list',
  styleUrl: './user-list.css',
  templateUrl: './user-list.html',
})
export class UserList {
  users = signal<User[]>([]);
  typeUsers = signal<TypeUser[]>([]);
  usersLoaded = signal(false);
  typeUsersLoaded = signal(false);

  constructor(
    private userService: UserService,
    private typeUserService: TypeUserService
  ){}

  ngOnInit(){
    this.userService.getUsers().subscribe(
      data => {
        this.listUsers(data);
        this.usersLoaded.set(true);
      });
    this.typeUserService.getUsers().subscribe(
      data => {
        this.typeUsers.set(data);
        this.typeUsersLoaded.set(true);
    });
  }

  listUsers(data: User[]) {
    this.users.set(data);
  }

  deleteUser(userId : number){
    this.userService.deleteUser(userId).subscribe(
      () => this.listUsers(this.users().filter(user => user.id !== userId))
    );
  }
}
