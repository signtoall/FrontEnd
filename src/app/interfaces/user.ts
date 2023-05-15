export interface UserAuthRequest {
    email: string;
    password: string;
}

export interface UserAuthResponse {
  email: string;
  name: string;
  lastName: string;
  token: string;
}

export interface UserRegisterRequest extends User {
  password: string;
}

export interface User {
  name:     string;
  lastName: string;
  nuip:     number;
  birthDay: Date;
  gender:   string;
  email:    string;
}