import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingControllerService {

  isLoading = false;
  mensaje:string;

  constructor(public loadingController: LoadingController) { }

  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      mode: "ios",
      message: 'Confirmando',
      cssClass: 'custom-loading',
    }).then(a => {
      a.present().then(() => {
        this.mensaje = 'Presente'
        //console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => 
          this.mensaje = 'Desaparece'
          //console.log('abort presenting')
          );
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() =>
    this.mensaje = 'Cancelado'
     //console.log('dismissed')
     );
  }
}
