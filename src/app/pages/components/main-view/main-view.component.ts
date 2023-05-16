import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
})
export class MainViewComponent  implements OnInit {

  constructor(private nvCtrl: NavController) { }

  ngOnInit() {}

  logout(){
    localStorage.removeItem('token');
    this.nvCtrl.navigateRoot('/', { animated: true });
  }

  profile(){
    this.nvCtrl.navigateRoot('/perfil', { animated: true })
  }

}
