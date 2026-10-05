import { Component, signal } from '@angular/core';
import { TypeUser } from '../../commun/type-user';
import { TypeUserService } from '../../services/type-user-service';
import { RouterLink } from '@angular/router';
import { SortType } from '../../commun/sort-type';

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

  get SortType() {
    return SortType;
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

  sortByAsc(sortType: SortType) {
    switch (sortType) {
      case SortType.TYPENAME:
        this.typeUsers.set(this.typeUsers().sort((typeUserA, typeUserB) =>
          String(typeUserA.typeName.toLocaleLowerCase()).localeCompare(String(typeUserB.typeName.toLocaleLowerCase()))
        ));
        break;
      case SortType.ID:
        this.typeUsers.set(this.typeUsers().sort((typeUserA, typeUserB) =>
          typeUserA.id - typeUserB.id
        ));
        break;
      default:
        break;
    }
  }

  sortByDesc(sortType: SortType) {
    switch (sortType) {
      case SortType.TYPENAME:
        this.typeUsers.set(this.typeUsers().sort((typeUserA, typeUserB) =>
          -1 * String(typeUserA.typeName.toLocaleLowerCase()).localeCompare(String(typeUserB.typeName.toLocaleLowerCase()))
        ));
        break;
      case SortType.ID:
        this.typeUsers.set(this.typeUsers().sort((typeUserA, typeUserB) =>
          -1 * (typeUserA.id - typeUserB.id)
        ));
        break;
      default:
        break;
    }
  }

}
