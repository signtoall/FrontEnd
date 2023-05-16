import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { addActivityByUserRequest, addActivityByUserResponse } from 'src/app/interfaces/activities';
import { ActivitiesService } from 'src/app/services/activities.service';

@Component({
  selector: 'app-memory-game',
  templateUrl: './memory-game.component.html',
  styleUrls: ['./memory-game.component.scss'],
})
export class MemoryGameComponent  implements OnInit {


  public gameState; //realizar un seguimiento del estado actual del juego.
  public startGame; //se establecerá en falso para mostrar la introducción.
  public countDown; //mostremos una cuenta regresiva de 3 segundos.
  public totalTime; //cuánto tiempo tiene el jugador para ganar.
  public countTime; //tiempo transcurrido mientras se juega el juego.
  public shownTime; //la hora se muestra como formato de cadena.
  public interTime; //temporizador de 1 segundo para el seguimiento del juego.
  public interCount; //temporizador 1 segundo para contador de juegos

  public cardsTotal = 16;	// Total de cartas para emparejar (dividido por 2)
  public cardsArray = [];	// Almacenar todos los pares de cartas
  public userLife = 10;		// Cantidad total de intentos que el usuario obtiene
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

  constructor(private activitiesService: ActivitiesService, private toastController: ToastController,
    private alertController: AlertController, private route: ActivatedRoute, private nvCtrl: NavController,) { }

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
  		// push la tarjeta a la matriz y asigne valor
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
          this.cardsArray.splice(this.selectOldPosix, 1, {pops: this.selectOldPosix, val:-1});
          this.cardsArray.splice(i,1,{pos:i, val:-1});
          this.resetSelects();
          this.winCon();
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
    this.gameState = 'Cargando';  //realizar un seguimiento del estado actual del juego.
    this.startGame = false;      //se establecerá en falso para mostrar la introducción.
    this.countDown = 3;         //mostremos una cuenta regresiva de 3 segundos.
    this.totalTime = 300;      //cuánto tiempo tiene el jugador para ganar.
    this.countTime = 0;       //tiempo transcurrido mientras se juega el juego.
    this.shownTime = 0;      //la hora se muestra como formato de cadena.
    this.interCount = null; //temporizador 1 segundo para contador de juegos
  
    this.userLife = 10;
    this.resetSelects();
    this.populateCards();
  	this.shuffle(this.cardsArray);
  	this.shuffle(this.images);

    setTimeout(()=>{
      this.startGame = true; //empieza el juego
      this.gameState = 'Iniciando';
    },this.countDown*1000);

    //esto restará 1 de la hora de inicio de la cuenta regresiva
    this.interCount = setInterval(()=>{
      if(this.countDown < 0){
        clearInterval(this.interCount);
        this.interCount = null;
      }else this.countDown -= 1;
    }, 1000);

    //este temporizador hará un seguimiento del tiempo una vez que comience el juego
    setTimeout(()=>{
      this.interTime = setInterval(()=>{
        if(this.countTime >= this.totalTime) this.loseCon();
          if(this.gameState == 'Iniciando'){
            this.countTime += 1; //añade 1 segundo al contador
            var minutes = Math.floor((this.totalTime - this.countTime)/60);
            var seconds = (this.totalTime - this.countTime) - minutes*60;
            this.shownTime = minutes.toString() + ":" + seconds.toString();
          }else{
            clearInterval(this.interTime);
            this.interTime = null;
          }   
      }, 1000)
    }, this.countDown*1000+200);
  }

  //condicion de ganar
  async winCon(){
    var winCheck = false;
    for(var i = 0; i< this.cardsArray.length; i++)
      if(this.cardsArray[i].val != -1) winCheck = true;
    if(winCheck == false) {
      //console.log(this.countTime) ENVIAR ESTO AL DOC
      let activityByUser: addActivityByUserRequest = {
        idActivity: this.route.snapshot.paramMap.get('idActivity'),
        timeDone: this.countTime
      };
      this.activitiesService.postActivityByUser(activityByUser).subscribe({
        next: async (activitiesByUserDb: addActivityByUserResponse) => {
          if (activitiesByUserDb)
            this.nvCtrl.navigateRoot('/main-view', { animated: true });
          else{
            const alert = await this.alertController.create({
              header: 'Error',
              message: `Algo ha salido mal al guardar los cambios: ${activitiesByUserDb}`,
              buttons: ['Ok'],
            });
            await alert.present();
          }
        },
        error: async (err: HttpErrorResponse) => {
          const alert = await this.alertController.create({
            header: 'Error',
            message: `${err?.error?.message ?? 'Algo ha salido mal al guardar los cambios'}`,
            buttons: ['Ok'],
          });
          await alert.present();
        }
      });
      this.gameState = 'Ganaste';
    }
  }

  //condicion de perder
  loseCon(){
    this.gameState = 'Perdiste';
  }

	// Función para resetear tarjetas seleccionadas
	resetSelects() {
    this.selectCard1pos = -1;	// Posición de la tarjeta seleccionada #1
    this.selectCard1val = -1;	// Valor de la tarjeta seleccionada #1
    this.selectCard2pos = -1;	// Posición de la tarjeta seleccionada #2
    this.selectCard2val = -1;	// Valor de la tarjeta seleccionada #2
	}

}
