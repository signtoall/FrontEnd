import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivitiesRoutingModule } from './activities-routing.module';
import { ViewActivitiesComponent } from './view-activities/view-activities.component';
import { MemoryGameComponent } from './memory-game/memory-game.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [ViewActivitiesComponent, MemoryGameComponent],
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    IonicModule
  ]
})
export class ActivitiesModule { }
