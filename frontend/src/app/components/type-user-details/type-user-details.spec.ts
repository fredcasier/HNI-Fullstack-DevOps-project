import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypeUserDetails } from './type-user-details';

describe('TypeUserDetails', () => {
  let component: TypeUserDetails;
  let fixture: ComponentFixture<TypeUserDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeUserDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(TypeUserDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
