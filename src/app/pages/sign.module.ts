import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignRoutingModule } from './sign-routing.module';
import { AccessPermissionsComponent } from './components/access-permissions/access-permissions.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AccessPermissionsComponent, LoginComponent, SignUpComponent],
  imports: [
    CommonModule,
    SignRoutingModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ]
})
export class SignModule { }
