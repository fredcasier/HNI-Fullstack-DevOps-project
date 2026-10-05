import { Component, signal } from '@angular/core';
import { User } from '../../commun/user';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../services/user-service';

@Component({
  imports: [RouterLink],
  selector: 'app-user-details',
  styleUrl: './user-details.css',
  templateUrl: './user-details.html',
})
export class UserDetails {
  user!: User;
  userId = -1;
  userFound = signal(false);

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.manageDetails();
    })
  }

  manageDetails() {
    this.userFound.set(false);
    if (this.route.snapshot.paramMap.has("id")) {
      this.userId = +this.route.snapshot.paramMap.get("id")!;
    }
    this.userService.getUser(this.userId).subscribe(
      data => {
        if (!data) {
          return;
        }
        this.loadUser(data);
        this.userFound.set(true);
      }
    )
  }

  loadUser(data: User) {
    this.user = data;
  }
}
