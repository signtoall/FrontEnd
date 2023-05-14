import { Component, OnInit } from '@angular/core';
import { activity } from 'src/app/interfaces/activities';
import { ActivitiesService } from 'src/app/services/activities.service';

@Component({
  selector: 'app-view-activities',
  templateUrl: './view-activities.component.html',
  styleUrls: ['./view-activities.component.scss'],
})
export class ViewActivitiesComponent  implements OnInit {

  activities:activity[];
  constructor(private activitiesService: ActivitiesService) { }

  ngOnInit() {
    this.activitiesService.getActivities().then(activities=>{
      this.activities = activities
    });
  }

}
