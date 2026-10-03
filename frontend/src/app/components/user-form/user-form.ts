import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TypeUser } from '../../commun/type-user';
import { TypeUserService } from '../../services/type-user-service';
import { UserService } from '../../services/user-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-user-form',
  styleUrl: './user-form.css',
  templateUrl: './user-form.html',
})
export class UserForm {
  userFormGroup!: FormGroup;

  typeUsers = signal<TypeUser[]>([]);


  constructor(private formBuilder: FormBuilder, private typeUserService: TypeUserService, private userService: UserService) {
    this.userFormGroup = this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
        typeUser: ['']
      })
  }

  ngOnInit(){
    this.typeUserService.getUsers().subscribe(
      data => {
        this.typeUsers.set(data);
      }
    )
  }

  onSubmit() {
    console.log(this.userFormGroup.value);
    let userToAdd = this.userFormGroup.value;

    this.userService.addUser(userToAdd).subscribe(
      data => console.log("Added User: " + userToAdd)
    );
  }
}
