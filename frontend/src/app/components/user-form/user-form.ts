import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TypeUser } from '../../commun/type-user';
import { TypeUserService } from '../../services/type-user-service';
import { UserService } from '../../services/user-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-user-form',
  styleUrl: './user-form.css',
  templateUrl: './user-form.html',
})
export class UserForm {
  userFormGroup!: FormGroup;
  private router = inject(Router);

  typeUsers = signal<TypeUser[]>([]);

  existingUser: boolean = false;
  userId: number = -1;

  constructor(private formBuilder: FormBuilder, private typeUserService: TypeUserService, private userService: UserService, private route: ActivatedRoute) {
    this.userFormGroup = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      typeUser: ['']
    })
  }

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.manageRequest();
    })
  }

  manageRequest() {
    this.typeUserService.getUsers().subscribe(
      data => {
        this.typeUsers.set(data);
        this.existingUser = this.route.snapshot.paramMap.has("id");

        if (this.existingUser) {
          this.userId = +this.route.snapshot.paramMap.get("id")!;
          this.populateForm();
        }
      }
    )

  }

  populateForm() {
    this.userService.getUser(this.userId).subscribe(
      data => {
        this.userFormGroup.setValue({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          typeUser: this.typeUsers().find(typeUser => typeUser.typeName === data.typeUser.typeName) ?? null
        });
      }
    )
  }

  onSubmit() {
    let user = this.userFormGroup.value;
    if (this.existingUser) {
      this.userService.updateUser({ ...user, id: this.userId }).subscribe(() => {
        this.router.navigate(['/users']);
      });
    }
    else {
      this.userService.addUser(user).subscribe(() => {
        this.router.navigate(['/users']);
      });
    }
  }
}
