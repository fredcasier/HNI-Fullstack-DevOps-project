import { Component, signal } from '@angular/core';
import { TypeUser } from '../../commun/type-user';
import { TypeUserService } from '../../services/type-user-service';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-type-user-list',
  styleUrl: './type-user-list.css',
  templateUrl: './type-user-list.html',
})
export class TypeUserList {
  typeUsers = signal<TypeUser[]>([]);
  typeUsersLoaded = signal(false);

  constructor(private typeUserService: TypeUserService) { }

  ngOnInit() {
    this.typeUserService.getUsers().subscribe(
      data => {
        this.listTypeUsers(data);
      }
    );
  }

  listTypeUsers(data: TypeUser[]) {
    this.typeUsers.set(data);
    this.typeUsersLoaded.set(true);
  }

  deleteTypeUser(typeUserId: number) {
    if (!window.confirm('Deleting this user type will delete all users with that type. \nDo you wish to continue ?')) {
      return;
    }

    this.typeUserService.deleteTypeUser(typeUserId).subscribe(
      () => this.listTypeUsers(this.typeUsers().filter(typeUser => typeUser.id !== typeUserId))
    );
  }

}
