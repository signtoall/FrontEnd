import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { activity } from 'src/app/interfaces/activities';
import { ActivitiesService } from 'src/app/services/activities.service';

@Component({
  selector: 'app-view-activities',
  templateUrl: './view-activities.component.html',
  styleUrls: ['./view-activities.component.scss'],
})
export class ViewActivitiesComponent  implements OnInit {

  activities:activity[];
  constructor(private activitiesService: ActivitiesService, private alertController: AlertController,) { }

  async ngOnInit() {
    try {
      this.activitiesService.getActivities().subscribe({
        next: async (activities: activity[])=>{
          this.activities = activities
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

}
