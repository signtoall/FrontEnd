import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  form : FormGroup= this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });
  
  constructor(private nvCtrl: NavController, private formBuilder: FormBuilder, private alertController: AlertController) { }

  ngOnInit() {}

  login(){}

}
