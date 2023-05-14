import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessPermissionsComponent } from './components/access-permissions/access-permissions.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AlphabetComponent } from './components/alphabet/alphabet.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { PerfilComponent } from './components/perfil/perfil.component';

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
  },
  {
    path:'alphabet',
    component:AlphabetComponent
  },
  {
    path:'main-view',
    component:MainViewComponent
  },
  {
    path:'about-us',
    component: AboutUsComponent
  },
  {
    path:'perfil',
    component: PerfilComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignRoutingModule { }
