import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Plugins } from '@capacitor/core';
import { AlertController, NavController } from '@ionic/angular';
import { UserAuthRequest, UserAuthResponse } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
const { Storage } = Plugins;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  form : FormGroup= this.formBuilder.group({
    email: ['', [Validators.required, Validators.email ]],
    password: ['', [Validators.required]]
  });
  
  constructor(private nvCtrl: NavController, private formBuilder: FormBuilder, private alertController: AlertController,
    private readonly authService: AuthService) { }

  ngOnInit() {}

  async login(){

    const auth: UserAuthRequest = {
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value
    }
    this.authService.postAuthentication(auth)
    .subscribe({
      next: async (response:UserAuthResponse) => {
        if (response){
          //Storage.set({key: "ACCESS_TOKEN_KEY", value: response.token});
          this.nvCtrl.navigateRoot('/main-view', { animated: true });
        }
      },
      error: async (err: HttpErrorResponse) => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: `${err.statusText}: ${err.message}`,
          buttons: ['Ok'],
        });
        await alert.present();
      }
    });


  }

}
