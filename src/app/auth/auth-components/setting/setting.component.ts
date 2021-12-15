import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/shared/guards/can-deactivate-guard.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../service/auth.service';
import { UserService } from '../../../service/user.service';
import { User, UserInfo } from '../../../shared/model/user.model';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
})
export class SettingComponent implements OnInit, CanComponentDeactivate {
  @ViewChild('settingForm') settingForm!: NgForm;

  user!: UserInfo;
  resultsPerPage = '0';
  isLoading: boolean = false;
  updateUser!: string | null;
  logoutUser!: string | null;
  userForm: any;
  changesSave = false;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProfile();
  }

  /**
   * Get user information from UserService with getUser()
   */
  getProfile() {
    this.userService.getUser().subscribe(
      (data) => {
        this.isLoading = false;
        this.user = data.user;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  /**
   * Accept settingForm.value as UserInfo => userForm have data like userFormValue
   * Then update confirm alert component appear
   * @param userFormValue
   */
  onSubmit(userFormValue: UserInfo) {
    this.changesSave = true;
    this.updateUser = 'Are you sure update your information?';
    this.userForm = userFormValue;
  }

  /**
   * Set itemsPerPage with selected item perpage => use localStorage to set itemsPerPage
   */
  onPageChoose() {
    if (this.resultsPerPage && this.resultsPerPage !== '0') {
      localStorage.setItem('itemsPerPage', this.resultsPerPage);
      this.router.navigateByUrl('/');
    }
  }

  /**
   * Logout alert components appear
   */
  logout() {
    this.logoutUser = 'Are you sure logout?';
  }

  /**
   * Call editUser() from AuthService with input data this.userForm === userFormValue
   */
  onHandleUpdate() {
    this.userService.editUser({ user: this.userForm }).subscribe(
      (data) => {
        this.isLoading = false;
        this.authService.setUser(data.user);
        this.authService.updateUser.next(data.user);
        this.router.navigate(['/profile', data.user.username]);
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'success',
          title: 'Update user success!!!',
        });
      },
      (err) => {
        const errorMsg = err.error.slice(42, err.error.length - 2);
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'error',
          title: errorMsg + ' has already been taken',
        });
        const statusCode = err.status;
        if (statusCode === 422) {
          console.log(`422`);
        } else if (statusCode === 404) {
          console.log(`404 : Not Found`);
        } else if (statusCode === 401) {
          console.log(`401 : Unauthorized Access`);
        } else if (statusCode === 403) {
          console.log(`403 : Forbidden Access`);
        }
      },
      () => {}
    );
  }

  /**
   * Call logout() from AuthService
   */
  onHandleLogout() {
    this.authService.logout();
  }

  /**
   * Set updateUser || logoutUser like null to close alert components
   */
  onHandleClose() {
    this.updateUser = null;
    this.logoutUser = null;
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.settingForm.dirty && !this.changesSave) {
      return Swal.fire({
        text: 'Do you want to discard the changes?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#273043',
        cancelButtonColor: '#DC3545',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          return true;
        } else {
          return false;
        }
      });
    }
    return true;
  }
}
