
export interface SignInResponse {
    user: User;
    tokens: Tokens;
  }
  
  export interface User {
    id: number;
    user_upn: string;
    user_name: string;
    user_number: string;
    email: string;
    user_location: string;
    user_role: number;
    user_role_name:string;
    password: string;
    c_password: string;
    autologin: string;
  }
  
  export interface Tokens {
    token_type: string;
    expires_in: number;
    access_token: string;
    refresh_token: string;
  }

  export interface ISignInUserData {
    upn:string;
    password:string;
    rememberMe?:boolean;
  }
  