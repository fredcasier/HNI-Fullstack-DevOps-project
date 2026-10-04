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


  constructor(private typeUserService: TypeUserService) { }

  ngOnInit() {
    this.typeUserService.getUsers().subscribe(
      data => {
        this.listUsers(data);
      }
    );
  }

  listUsers(data: TypeUser[]) {
    this.typeUsers.set(data);
  }

  deleteTypeUser(typeUserId: number) {
    if (!window.confirm('Deleting this user type will delete all users with that type. \nDo you wish to continue ?')) {
      return;
    }

    this.typeUserService.deleteTypeUser(typeUserId).subscribe(
      () => this.listUsers(this.typeUsers().filter(typeUser => typeUser.id !== typeUserId))
    );
  }

}
