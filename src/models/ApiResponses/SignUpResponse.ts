import { User } from "./UserModel";



export interface ISignupBody {
  user_upn: string;
  user_name: string;
  user_number: string;
  email: string;
  user_location: string;
  user_role: number;
  password: string;
  c_password: string;
  autologin: string;

}

export interface SignupResponse {
  user: User;
}


export interface SAPBody {
  user_upn: string;
  user_number: string;
}

export interface SAPResponse {
  data: SAPAPIResponse;
}


export interface SAPAPIResponse{
  data:Data
}
export interface Data {
  User: string;
  Name: string;
  Email: string;
  Phone: string;
  Status: string;
  Message: Message;
}

export interface Message {}

