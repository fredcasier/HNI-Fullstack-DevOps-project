import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { TypeUser } from '../../commun/type-user';
import { User } from '../../commun/user';
import { TypeUserService } from '../../services/type-user-service';
import { UserService } from '../../services/user-service';
import { UserList } from './user-list';

describe('UserList', () => {
  let component: UserList;
  let fixture: ComponentFixture<UserList>;
  const routeParams = new BehaviorSubject(convertToParamMap({ typeid: '1' }));
  const allUsers = [
    new User(1, 'Ada', 'Lovelace', 'ada@example.test', new TypeUser(1, 'Admin')),
    new User(2, 'Grace', 'Hopper', 'grace@example.test', new TypeUser(2, 'Member')),
    new User(3, 'Katherine', 'Johnson', 'katherine@example.test', new TypeUser(1, 'Admin')),
  ];

  beforeEach(async () => {
    routeParams.next(convertToParamMap({ typeid: '1' }));
    await TestBed.configureTestingModule({
      imports: [UserList],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { paramMap: routeParams.asObservable() } },
        { provide: UserService, useValue: { getUsers: () => of(allUsers), deleteUser: () => of(undefined) } },
        { provide: TypeUserService, useValue: { getUsers: () => of([new TypeUser(1, 'Admin'), new TypeUser(2, 'Member')]) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserList);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows only users with the routed user type id', () => {
    expect(component.users().map(user => user.id)).toEqual([1, 3]);
  });

  it('updates the filtered users when the routed user type changes', () => {
    routeParams.next(convertToParamMap({ typeid: '2' }));

    expect(component.users().map(user => user.id)).toEqual([2]);
  });

  it('shows all users when no user type id is routed', () => {
    routeParams.next(convertToParamMap({}));

    expect(component.users().map(user => user.id)).toEqual([1, 2, 3]);
  });
});
