import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';
import { UserInfo } from '../shared/model/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  user!: UserInfo;
  userUpdate$!: Subscription;
  logoutUserSide!: string | null;
  constructor(
    private authService: AuthService, // private route: ActivatedRoute, // private router: Router
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((currentUser) => {
      this.user = currentUser as UserInfo;
    });
    if (this.authService.isLoggedIn()) {
      this.getProfile();

      this.userUpdate$ = this.authService.updateUser.subscribe((user) => {
        this.user = user;
      });
    }
  }

  getProfile() {
    this.userService.getUser().subscribe(
      (data) => {
        this.user = data.user;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  get isLogin() {
    return this.authService.isLoggedIn();
  }

  get currentUser(): string {
    return this.authService.getUserName();
  }

  ngOnDestroy() {
    this.userUpdate$.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }
}
