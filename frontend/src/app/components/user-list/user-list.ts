import { Component, signal } from '@angular/core';
import { User } from '../../commun/user';
import { UserService } from '../../services/user-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TypeUser } from '../../commun/type-user';
import { TypeUserService } from '../../services/type-user-service';
import { SortType } from '../../commun/sort-type';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  imports: [RouterLink, NgbModule],
  selector: 'app-user-list',
  styleUrl: './user-list.css',
  templateUrl: './user-list.html',
})
export class UserList {
  users = signal<User[]>([]);
  typeUsers = signal<TypeUser[]>([]);
  usersLoaded = signal(false);
  typeUsersLoaded = signal(false);
  typeUserId = signal<number | null>(null);
  typeUserName = signal<TypeUser['typeName'] | null>(null);
  pageNumber = 1;
  pageSize = 10;
  totalElements = 0;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private typeUserService: TypeUserService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const typeUserId = params.get('typeid');
      this.typeUserId.set(typeUserId === null ? null : Number(typeUserId));
      this.pageNumber = 1;
      this.updateTypeUserName();
      this.fetchUsers();
    });
    this.typeUserService.getTypeUsers().subscribe(
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
    this.users.set(data);
  }

  fetchUsers() {
    this.userService.getUsersByPagination(this.pageNumber, this.pageSize, this.typeUserId()).subscribe(
      data => {
        this.listUsers(data._embedded.users);
        this.pageNumber = data.page.number + 1;
        this.pageSize = data.page.size;
        this.totalElements = data.page.totalElements;
        this.usersLoaded.set(true);
      }
    );
  }

  updatePageSize(pageSize: string) {
    this.pageSize = +pageSize;
    this.pageNumber = 1;
    this.fetchUsers();
  }

  private updateTypeUserName() {
    const typeUserId = this.typeUserId();
    this.typeUserName.set(
      typeUserId === null ? null : this.typeUsers().find(typeUser => typeUser.id === typeUserId)?.typeName ?? null
    );
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(
      () => {
        if (this.users().length === 1 && this.pageNumber > 1) {
          this.pageNumber--;
        }
        this.fetchUsers();
      }
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