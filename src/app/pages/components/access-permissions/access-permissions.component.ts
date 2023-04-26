import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-access-permissions',
  templateUrl: './access-permissions.component.html',
  styleUrls: ['./access-permissions.component.scss'],
})
export class AccessPermissionsComponent  implements OnInit {

  constructor(private nvCtrl: NavController) { }

  ngOnInit() {}

  login(){
    this.nvCtrl.navigateRoot('/login', { animated: true });
  }

  signup(){
    this.nvCtrl.navigateRoot('/signup', { animated: true });
  }

}
