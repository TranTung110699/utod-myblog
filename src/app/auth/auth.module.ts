import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { SignComponent } from './auth-components/sign/sign.component';
import { SettingComponent } from './auth-components/setting/setting.component';
import { LoginComponent } from './auth-components/login/login.component';

import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AuthComponent,
    SignComponent,
    SettingComponent,
    LoginComponent,
  ],
  imports: [AuthRoutingModule, HttpClientModule, FormsModule, SharedModule],
  exports: [],
})
export class AuthModule {}
