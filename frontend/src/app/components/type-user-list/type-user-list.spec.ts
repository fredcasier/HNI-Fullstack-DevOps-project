import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypeUserList } from './type-user-list';

describe('TypeUserList', () => {
  let component: TypeUserList;
  let fixture: ComponentFixture<TypeUserList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeUserList],
    }).compileComponents();

    fixture = TestBed.createComponent(TypeUserList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
