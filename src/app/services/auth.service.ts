import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserAuthRequest, UserAuthResponse, UserRegisterRequest, User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _url: string = environment.URL;
  constructor(private http: HttpClient) { }

  postAuthentication(userAuth: UserAuthRequest): Observable<User>{
    return this.http.post<User>(`${ this._url }auth/login`, userAuth);
  }

  postRegister(userAuth: UserRegisterRequest): Observable<User>{
    return this.http.post<User>(`${ this._url }auth/register`, userAuth);
  }

  getUserData(): Observable<User>{
    return this.http.get<User>(`${this._url}user`)
  }
}
