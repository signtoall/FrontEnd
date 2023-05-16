import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { activity, activityByUser, addActivityByUserResponse } from 'src/app/interfaces/activities';
import { ActivitiesService } from 'src/app/services/activities.service';

@Component({
  selector: 'app-view-activities',
  templateUrl: './view-activities.component.html',
  styleUrls: ['./view-activities.component.scss'],
})
export class ViewActivitiesComponent  implements OnInit {

  activities:activityByUser[] = [];
  activitiesByUser: addActivityByUserResponse[] = [];

  constructor(private activitiesService: ActivitiesService, private alertController: AlertController,) { }

  async ngOnInit() {
    try {
      this.activitiesService.getActivityByUser().subscribe({
        next: async (activitiesByUserDb: addActivityByUserResponse[]) => {
          this.activitiesByUser = [...activitiesByUserDb];
          this.setActivities();
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
      
    } catch (error) {
      const alert = this.alertController.create({
        header: 'Error',
        message: `Error: ${error.message}`,
        buttons: ['Ok'],
      });
      (await alert).present();
    }
  }

  async setActivities(){
    this.activitiesService.getActivities().subscribe({
      next: async (activities: activity[])=>{
        activities.forEach((activity: activity)=>{
          let activityByUser: activityByUser = {
            _id: activity._id,
            description: activity.description,
            image: activity.image,
            isDone: this.activitiesByUser.find((actUser:addActivityByUserResponse) => actUser.idActivity === activity._id)?.isDone ?? false,
            name: activity.name,
            timeDone: this.activitiesByUser.find((actUser:addActivityByUserResponse) => actUser.idActivity === activity._id)?.timeDone ?? 0,
            url: activity.url
          };
          this.activities.push(activityByUser)
        });
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

  evalueActivityState(state:boolean):string{
    if (state){
      return "success";
    }else{
      return "danger"; 
    }
  }

}
