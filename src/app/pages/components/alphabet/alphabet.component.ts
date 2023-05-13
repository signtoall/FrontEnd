import { Component, OnInit } from '@angular/core';
import { alphabet } from 'src/app/interfaces/activities';
import { ActivitiesService } from 'src/app/services/activities.service';

@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabet.component.html',
  styleUrls: ['./alphabet.component.scss'],
})
export class AlphabetComponent  implements OnInit {

  
  public images: any = ['slide 1', 'slide 2', 'slide 3', 'slide 4', 'slide 5'];

  letters:alphabet[];

  constructor(private activitiesService: ActivitiesService) { }

  ngOnInit() {
    this.activitiesService.getAlphabet().then(letters=>{
      this.letters = letters
    });
  }

}
