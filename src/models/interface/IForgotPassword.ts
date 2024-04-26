import { MutableRefObject } from "react";


export interface IForgotPasswordEnteredDetail{
    [key:string|number]:MutableRefObject<string>;
    upn:MutableRefObject<string>,
    contact:MutableRefObject<string>,
}