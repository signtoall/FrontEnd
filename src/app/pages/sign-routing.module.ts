import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessPermissionsComponent } from './components/access-permissions/access-permissions.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    component: AccessPermissionsComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'signup',
    component:SignUpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignRoutingModule { }
