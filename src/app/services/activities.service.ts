import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { alphabet, activity } from '../interfaces/activities';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  constructor(private http: HttpClient) { }

  getAlphabet() {
    return this.http.get<any>('assets/jsons/alphabet.json').toPromise()
      .then(res => res.data as alphabet[])
      .then(data => data);
  }

  getActivities() {
    return this.http.get<any>('assets/jsons/activities.json').toPromise()
      .then(res => res.data as activity[])
      .then(data => data);
  }
  
}
