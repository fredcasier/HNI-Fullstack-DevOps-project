import { Component, signal } from '@angular/core';
import { User } from '../../commun/user';
import { UserService } from '../../services/user-service';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-user-list',
  styleUrl: './user-list.css',
  templateUrl: './user-list.html',
})
export class UserList {
  users = signal<User[]>([]);

  constructor(private userService: UserService){}

  ngOnInit(){
    this.userService.getUsers().subscribe(
      data => {
        this.listUsers(data);
      }
    )
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
