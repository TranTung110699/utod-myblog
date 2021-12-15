import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {
  UserData,
  UserInfo,
  UserSignIn,
  UserSignUp,
} from '../shared/model/user.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'https://conduit.productionready.io/api';
  private timeLogout = 1000 * 60 * 10;
  private defaultNumPerPage = 6;
  private autoLog!: any;
  updateUser = new Subject<UserInfo>();
  currentUser = new BehaviorSubject<UserInfo | null>(null);
  constructor(private http: HttpClient, private router: Router) {}

  // Sign in the account
  loginUser(user: { user: UserSignIn }) {
    return this.http.post<UserData>(`${this.API_URL}/users/login`, user).pipe(
      tap(() => {
        this.autoLogout();
        this.setDefaultPage();
      })
    );
  }

  // Sign up the account
  signUpUser(user: { user: UserSignUp }) {
    return this.http.post<UserData>(`${this.API_URL}/users`, user).pipe(
      tap(() => {
        this.autoLogout();
        this.setDefaultPage();
      })
    );
  }

  // Set auto Logout after 10 minutes when user is logged in.
  autoLogout() {
    this.autoLog = setTimeout(() => {
      this.logout();
      Swal.fire({
        title: 'UTOD',
        text: 'The login session has expired!',
        icon: 'warning',
        confirmButtonColor: '#fe4f70',
      });
    }, this.timeLogout);
  }

  // Store info user into local storage to get Token
  setUser(userData: UserInfo) {
    const user = {
      username: userData.username,
      token: `Token ${userData.token}`,
    };
    window.localStorage.setItem('user', JSON.stringify(user));
  }

  // Auto login when reload page if user is logged in
  autoLoad() {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user') || '');
      this.autoLogout();
    } else {
      clearTimeout(this.autoLog);
    }
    return;
  }

  // Logout the account
  logout() {
    this.removeUser();
    this.router.navigateByUrl('/auth/login');
    window.localStorage.removeItem('itemsPerPage');
    clearTimeout(this.autoLog);
  }

  // Delete user data from local storage
  removeUser() {
    window.localStorage.removeItem('user');
  }

  // Get username from local storage
  getUserName() {
    return JSON.parse(localStorage.getItem('user') || '{}').username;
  }

  // Get token from local storage
  getUserToken() {
    return JSON.parse(localStorage.getItem('user') || '{}').token;
  }

  // Check whether user is logged in
  isLoggedIn(): boolean {
    const currentUser = JSON.parse(window.localStorage.getItem('user') || '{}');
    if (currentUser && currentUser.token) {
      return true;
    }
    return false;
  }

  // Set the default number articles per page to local storage
  setDefaultPage() {
    localStorage.setItem('itemsPerPage', this.defaultNumPerPage + '');
  }

  // Get the number of articles per page from local storage
  getPage() {
    return JSON.parse(localStorage.getItem('itemsPerPage') || '{}');
  }

  //Set information of current User when login
  setCurrentUser(obj: UserInfo) {
    this.currentUser.next(obj);
  }
}
