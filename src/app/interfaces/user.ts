export interface UserAuthRequest {
    email: string;
    password: string;
}

export interface UserAuthResponse {
  email: string;
  name: string;
  lastName: string;
  nuip: number;
  token: string;
}

export interface UserRegisterRequest extends UserDto {
  password: string;
}

export interface UserDto {
  name:     string;
  lastName: string;
  nuip:     number;
  birthDay: Date;
  gender:   string;
  email:    string;
}