import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { alphabet, activity, addActivityByUserRequest, addActivityByUserResponse } from '../interfaces/activities';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  private _url: string = environment.URL;
  constructor(private http: HttpClient) { }

  getAlphabet() {
    return this.http.get<any>('assets/jsons/alphabet.json').toPromise()
      .then(res => res.data as alphabet[])
      .then(data => data);
  }

  postActivityByUser (activity: addActivityByUserRequest) : Observable<addActivityByUserResponse> {
    return this.http.post<addActivityByUserResponse>(`${ this._url }activity-by-user/add`, activity);
  }
  
  getActivityByUser () : Observable<addActivityByUserResponse[]> {
    return this.http.get<addActivityByUserResponse[]>(`${ this._url }activity-by-user/get`);
  }

  getActivities(): Observable<activity[]>{
    return this.http.get<activity[]>(`${ this._url }activities/getActivities`);
  }
}
