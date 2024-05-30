import { MutableRefObject } from "react";

export interface IForgotPasswordEnteredDetail {
  [key: string]: string;
  upn: string;
  contact: string;
}

export interface IOTPFields {
  [key: string | number]: MutableRefObject<any>;
  first: React.MutableRefObject<null>;
  second: React.MutableRefObject<null>;
  third: React.MutableRefObject<null>;
  forth: React.MutableRefObject<null>;
  fifth: React.MutableRefObject<null>;
}
