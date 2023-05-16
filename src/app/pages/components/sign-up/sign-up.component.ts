import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { UserDto, UserRegisterRequest } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingControllerService } from 'src/app/services/loading-controller.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent  implements OnInit {

  form : FormGroup= this.formBuilder.group({
    username: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    nuip: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    birthDay: ['', [Validators.required]],
    password: ['', [Validators.required]],
    passwordConfirm: ['', [Validators.required]]
  });
  
  constructor(private nvCtrl: NavController, private formBuilder: FormBuilder, private alertController: AlertController,
    private readonly authService:AuthService, private loading: LoadingControllerService) { }

  ngOnInit() {}

  async signup(){

    // Confirmation password
    if (this.form.controls['password'].value !== this.form.controls['passwordConfirm'].value)
    {
      const alert = await this.alertController.create({
        header: 'Alerta',
        message: '¡Las contraseñas no coinciden!',
        buttons: ['Entiendo'],
      });
      await alert.present();
      return;
    }

    // Create object request
    let userRegister: UserRegisterRequest = {
      name: this.form.controls['username'].value,
      lastName: this.form.controls['lastname'].value,
      nuip: this.form.controls['nuip'].value,
      gender: this.form.controls['gender'].value,
      email: this.form.controls['email'].value,
      birthDay: this.form.controls['birthDay'].value,
      password: this.form.controls['password'].value
    };

    this.loading.present();
    // Register User
    this.authService.postRegister(userRegister)
    .subscribe({
      next: async (response: UserDto) => {
        this.loading.dismiss(); 
        const alert = await this.alertController.create({
          header: '¡Felicitaciones!',
          message: `Bienvenido ${response.name}, su cuenta ha sido creada.`,
          buttons: ['Ok'],
        });
        await alert.present();
        this.nvCtrl.navigateRoot('/', { animated: true });
      },
      error: async (err: HttpErrorResponse) => {
        this.loading.dismiss(); 
        const alert = await this.alertController.create({
          header: 'Error',
          message: `${err?.error?.message ?? 'Mensaje no disponible.'}`,
          buttons: ['Ok'],
        });
        await alert.present();
      }
    });
  }

}
