import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewActivitiesComponent } from './view-activities/view-activities.component';
import { MemoryGameComponent } from './memory-game/memory-game.component';

const routes: Routes = [
  {
    path: '',
    component: ViewActivitiesComponent
  },
  {
    path: 'memory/:idActivity',
    component: MemoryGameComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule { }
