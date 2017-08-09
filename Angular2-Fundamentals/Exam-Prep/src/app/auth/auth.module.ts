import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdInputModule, MdButtonModule, MdCardModule } from '@angular/material';

import { HttpService } from '../shared';
import { AuthService } from '.';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdInputModule,
    MdButtonModule,
    MdCardModule,
    BrowserAnimationsModule
  ],
  declarations: [RegisterComponent, LoginComponent, ProfileComponent],
  providers: [AuthService]
})
export class AuthModule { }
