import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignRoutingModule } from './sign-routing.module';
import { AccessPermissionsComponent } from './components/access-permissions/access-permissions.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlphabetComponent } from './components/alphabet/alphabet.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { PerfilComponent } from './components/perfil/perfil.component';


@NgModule({
  declarations: [AccessPermissionsComponent, LoginComponent, SignUpComponent, AlphabetComponent,
  MainViewComponent, AboutUsComponent, PerfilComponent],
  imports: [
    CommonModule,
    SignRoutingModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ]
})
export class SignModule { }
