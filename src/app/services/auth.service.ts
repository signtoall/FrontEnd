import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserAuthRequest, UserAuthResponse, UserRegisterRequest, UserDto } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _url: string = environment.URL;
  constructor(private http: HttpClient) { }

  postAuthentication(userAuth: UserAuthRequest): Observable<UserAuthResponse>{
    return this.http.post<UserAuthResponse>(`${ this._url }auth/login`, userAuth);
  }

  postRegister(userAuth: UserRegisterRequest): Observable<UserDto>{
    return this.http.post<UserDto>(`${ this._url }auth/register`, userAuth);
  }

  getUserData(): Observable<UserDto>{
    return this.http.get<UserDto>(`${this._url}user`)
  }
}
