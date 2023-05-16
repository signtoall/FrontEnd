import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UserDto } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent  implements OnInit {

  perfilUser: UserDto = {
    name: 'No disponible',
    lastName: 'No disponible',
    nuip: '0000000001',
    birthDay: new Date(),
    email: 'example@example.com',
    gender : 'N/A'
  }

  constructor(private readonly userService:AuthService,
    private alertController: AlertController) { }


  async ngOnInit() {
    this.userService.getUserData().subscribe({
      next: (userDb: UserDto) => {
        this.perfilUser = userDb;
      },
      error: async (err: HttpErrorResponse) => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: `${err.statusText}: ${err.message}`,
          buttons: ['Ok'],
        });
        await alert.present();
      }
    })
  }

}
