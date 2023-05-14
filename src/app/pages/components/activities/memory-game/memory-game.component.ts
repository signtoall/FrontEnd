import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ActivitiesService } from 'src/app/services/activities.service';

@Component({
  selector: 'app-memory-game',
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.scss'],
})
export class MemoryGameComponent  implements OnInit {


  public cardsTotal = 16;	// Total de cartas para emparejar (dividido por 2)
  public cardsArray = [];	// Almacenar todos los pares de cartas
  public userLife = 5;		// Cantidad total de intentos que el usuario obtiene
  public imageDir = 'assets/LSC/';
  public images = ['LetraA', 'LetraB', 'LetraC','LetraH','LetraI','LetraJ',
  	'LetraL', 'LetraM', 'LetraN', 'LetraO','LetraP','LetraU',
    'LetraV','LetraW','LetraY','LetraZ'
  ];

  public selectCard1pos = -1;	// Posición de la tarjeta seleccionada #1
  public selectCard1val = -1;	// Valor de la tarjeta seleccionada #1
  public selectCard2pos = -1;	// Posición de la tarjeta seleccionada #2
  public selectCard2val = -1;	// Valor de la tarjeta seleccionada #2
  public selectOldPosix = -1; //Almacenar posición anterior

  public debugText = "Debug text goes here! :)"

  constructor(private activitiesService: ActivitiesService, private toastController: ToastController) { }

  ngOnInit() {
  	this.restartGame();
  }

  async presentToast(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1000,
      position: 'top',
      cssClass: 'custom-toast',
    });

    await toast.present();
  }

  // Función para llenar la matriz de tarjetas con pares de posición y valor de 0 a 6
  populateCards() {
  	this.cardsArray = [];
  	var x = 0;
  	var y = 0;
  	for (var i = 0; i < this.cardsTotal; i++) {
  		// Empuje la tarjeta a la matriz y asigne valor
  		this.cardsArray.push({pos:i, val:y});
  		// Voltee x para asignar el mismo valor a la siguiente tarjeta
  		if (x == 0) x = 1;
  		else { x = 0; y++ }
  	}
  }

  // Función para seleccionar una tarjeta
  selectCard(pos, val, i) {
    var actOne = false;

    //Código para seleccionar la segunda carta
    if(this.selectCard1pos > -1 && this.selectCard2pos == -1){
      this.selectCard2pos = pos;
  	  this.selectCard2val = val;
      actOne = true;
    }

  	// Código para seleccionar la primera carta
    if(this.selectCard1pos == -1 && !actOne){
      this.selectCard1pos = pos;
  	  this.selectCard1val = val;
      this.selectOldPosix = i;
    }

    //si tenemos ambas cartas seleccionadas, comprobar si coinciden o fallan
    if(actOne && this.selectCard1pos > -1 && this.selectCard2pos > -1){
      setTimeout(() => {
        //if las cartas coinciden, hacer esto
        if(this.selectCard1val == this.selectCard2val){
          this.presentToast('Encontraste una pareja');
          if(this.userLife <5){
            this.userLife += 1;
          }
          this.cardsArray.splice(this.selectOldPosix, 1, {pops: this.selectOldPosix, val:-1});
          this.cardsArray.splice(i,1,{pos:i, val:-1});
          this.resetSelects();
        }
        //de lo contrario, quitar una vida y resetear
        else{
          this.presentToast('Las imágenes no coinciden, pierdes una vida');
          this.userLife -= 1;
          this.resetSelects();
          if(this.userLife <=0){
            this.presentToast('Perdiste, vuelve a intentarlo');
            this.restartGame();
          }
        }
      }, 1000);
    }
  }

    // Función para barajar una matriz
    shuffle(a) {
	    var j, x, i;
	    for (i = a.length; i; i--) {
	        j = Math.floor(Math.random() * i);
	        x = a[i - 1];
	        a[i - 1] = a[j];
	        a[j] = x;
	    }
	  }

  //Funcion para reiniciar el juego
  restartGame(){
    this.userLife = 5;
    this.resetSelects();
    this.populateCards();
  	this.shuffle(this.cardsArray);
  	this.shuffle(this.images);
  }

	// Función para resetear tarjetas seleccionadas
	resetSelects() {
      this.selectCard1pos = -1;	// Posición de la tarjeta seleccionada #1
      this.selectCard1val = -1;	// Valor de la tarjeta seleccionada #1
      this.selectCard2pos = -1;	// Posición de la tarjeta seleccionada #2
      this.selectCard2val = -1;	// Valor de la tarjeta seleccionada #2
	}

  

}
