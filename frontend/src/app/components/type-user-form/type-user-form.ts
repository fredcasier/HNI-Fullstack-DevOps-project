import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TypeUserService } from '../../services/type-user-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-type-user-form',
  styleUrl: './type-user-form.css',
  templateUrl: './type-user-form.html',
})
export class TypeUserForm {
  typeUserFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private typeUserService: TypeUserService) {
    this.typeUserFormGroup = this.formBuilder.group({
      typeName: ['']
    });
  }

  onSubmit() {
    this.typeUserService.addTypeUser(this.typeUserFormGroup.value).subscribe();
  }
}
