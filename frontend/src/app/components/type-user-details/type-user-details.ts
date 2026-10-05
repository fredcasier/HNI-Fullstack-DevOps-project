import { Component, signal } from '@angular/core';
import { User } from '../../commun/user';
import { UserService } from '../../services/user-service';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-type-user-details',
  styleUrl: './type-user-details.css',
  templateUrl: './type-user-details.html',
})
export class TypeUserDetails {
  users = signal<User[]>([]);
  usersLoaded = signal(false);
  typeName = "None";

  constructor(
    private userService: UserService,
  ){}

  ngOnInit(){
    this.userService.getUsers().subscribe(
      data => {
        this.listUsers(data);
        this.usersLoaded.set(true);
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
