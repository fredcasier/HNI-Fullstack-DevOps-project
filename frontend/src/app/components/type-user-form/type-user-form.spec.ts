import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypeUserForm } from './type-user-form';

describe('TypeUserForm', () => {
  let component: TypeUserForm;
  let fixture: ComponentFixture<TypeUserForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeUserForm],
    }).compileComponents();

    fixture = TestBed.createComponent(TypeUserForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
