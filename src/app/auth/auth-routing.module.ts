import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SignComponent } from './auth-components/sign/sign.component';
import { SettingComponent } from './auth-components/setting/setting.component';
import { LoginComponent } from './auth-components/login/login.component';
import { AuthGuard } from '../shared/guards/auth.guard.service';
import { LoggedInGuard } from '../shared/guards/logged-in.guard.service';
import { CanDeactivateGuard } from '../shared/guards/can-deactivate-guard.service';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'sign-up',
        component: SignComponent,
        canActivate: [LoggedInGuard],
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoggedInGuard],
      },
      {
        path: 'setting',
        component: SettingComponent,
        canActivate: [AuthGuard],
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
