import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TypeUserService } from '../../services/type-user-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-type-user-form',
  styleUrl: './type-user-form.css',
  templateUrl: './type-user-form.html',
})
export class TypeUserForm {
  typeUserFormGroup: FormGroup;
  existingTypeUser = false;
  typeUserId = -1;

  constructor(private formBuilder: FormBuilder, private typeUserService: TypeUserService, private route: ActivatedRoute, private router: Router) {
    this.typeUserFormGroup = this.formBuilder.group({
      typeName: ['']
    });
  }

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.existingTypeUser = this.route.snapshot.paramMap.has('id');

      if (this.existingTypeUser) {
        this.typeUserId = +this.route.snapshot.paramMap.get('id')!;
        this.typeUserService.getTypeUser(this.typeUserId).subscribe(typeUser => {
          this.typeUserFormGroup.setValue({
            typeName: typeUser.typeName
          });
        });
      }
    });
  }

  onSubmit() {
    if (this.existingTypeUser) {
      this.typeUserService.updateTypeUser({
        id: this.typeUserId,
        typeName: this.typeUserFormGroup.value.typeName
      }).subscribe(() => {
        this.router.navigate(['/types']);
      });
    } else {
      this.typeUserService.addTypeUser(this.typeUserFormGroup.value).subscribe(() => {
        this.router.navigate(['/types']);
      });
    }
  }
}
