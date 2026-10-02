import { Component, signal } from '@angular/core';
import { TypeUser } from '../../commun/type-user';
import { TypeUserService } from '../../services/type-user-service';

@Component({
  imports: [],
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
    console.log("Logging data: " + data);
    this.typeUsers.set(data);
  }

}
