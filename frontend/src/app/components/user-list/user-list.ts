import { Component, signal } from '@angular/core';
import { User } from '../../commun/user';
import { UserService } from '../../services/user-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TypeUser } from '../../commun/type-user';
import { TypeUserService } from '../../services/type-user-service';
import { SortType } from '../../commun/sort-type';

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
  private allUsers: User[] = [];
  typeUserId = signal<number | null>(null);
  typeUserName = signal<TypeUser['typeName'] | null>(null);

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private typeUserService: TypeUserService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const typeUserId = params.get('typeid');
      this.typeUserId.set(typeUserId === null ? null : Number(typeUserId));
      this.updateTypeUserName();
      this.loadUsers();
    });
    this.typeUserService.getUsers().subscribe(
      data => {
        this.typeUsers.set(data);
        this.updateTypeUserName();
        this.typeUsersLoaded.set(true);
      });
  }

  get SortType() {
    return SortType;
  }

  listUsers(data: User[]) {
    this.allUsers = data;
    this.users.set(data);
  }

  private loadUsers() {
    const typeUserId = this.typeUserId();
    if (typeUserId === null) {
      this.userService.getUsers().subscribe(
        data => {
          this.listUsers(data);
          this.usersLoaded.set(true);
        }
      )
    } else {
      this.userService.getUsersByTypeUserId(typeUserId).subscribe(
        data => {
          this.listUsers(data);
          this.usersLoaded.set(true);
        }
      )
    }
  }

  private updateTypeUserName() {
    const typeUserId = this.typeUserId();
    this.typeUserName.set(
      typeUserId === null ? null : this.typeUsers().find(typeUser => typeUser.id === typeUserId)?.typeName ?? null
    );
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(
      () => this.listUsers(this.allUsers.filter(user => user.id !== userId))
    );
  }

  sortByAsc(sortType: SortType) {
    switch (sortType) {
      case SortType.TYPENAME:
        this.users.set(this.users().sort((userA, userB) =>
          String(userA.typeUser.typeName.toLocaleLowerCase()).localeCompare(String(userB.typeUser.typeName.toLocaleLowerCase()))
        ));
        break;
      case SortType.FIRSTNAME:
        this.users.set(this.users().sort((userA, userB) =>
          String(userA.firstName.toLocaleLowerCase()).localeCompare(String(userB.firstName.toLocaleLowerCase()))
        ));
        break;
      case SortType.LASTNAME:
        this.users.set(this.users().sort((userA, userB) =>
          String(userA.lastName.toLocaleLowerCase()).localeCompare(String(userB.lastName.toLocaleLowerCase()))
        ));
        break;
      case SortType.EMAIL:
        this.users.set(this.users().sort((userA, userB) =>
          String(userA.email.toLocaleLowerCase()).localeCompare(String(userB.email.toLocaleLowerCase()))
        ));
        break;
      default:
        break;
    }
  }

  sortByDesc(sortType: SortType) {
    switch (sortType) {
      case SortType.TYPENAME:
        this.users.set(this.users().sort((userA, userB) =>
          -1 * String(userA.typeUser.typeName.toLocaleLowerCase()).localeCompare(String(userB.typeUser.typeName.toLocaleLowerCase()))
        ));
        break;
      case SortType.FIRSTNAME:
        this.users.set(this.users().sort((userA, userB) =>
          -1 * String(userA.firstName.toLocaleLowerCase()).localeCompare(String(userB.firstName.toLocaleLowerCase()))
        ));
        break;
      case SortType.LASTNAME:
        this.users.set(this.users().sort((userA, userB) =>
          -1 * String(userA.lastName.toLocaleLowerCase()).localeCompare(String(userB.lastName.toLocaleLowerCase()))
        ));
        break;
      case SortType.EMAIL:
        this.users.set(this.users().sort((userA, userB) =>
          -1 * String(userA.email.toLocaleLowerCase()).localeCompare(String(userB.email.toLocaleLowerCase()))
        ));
        break;
      default:
        break;
    }
  }
}