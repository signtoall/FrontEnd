import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent  implements OnInit {

  form : FormGroup= this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });
  
  constructor(private nvCtrl: NavController, private formBuilder: FormBuilder, private alertController: AlertController) { }

  ngOnInit() {}

  signup(){}

}
