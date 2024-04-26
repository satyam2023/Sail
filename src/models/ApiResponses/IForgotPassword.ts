export interface RequestOtpResponse {
    message: string;
    status: string;
    token: string;
  }
  
  export interface VerifyOtpResponse {
    message: string;
    token: string;
  }
  
  export interface ResetOtpResponse {
    message: string;
  }
  