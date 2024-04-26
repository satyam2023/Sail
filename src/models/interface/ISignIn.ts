import { MutableRefObject } from "react";

export interface ISignInUser{
    [key:string|number]:MutableRefObject<string|number>;
    upn: MutableRefObject<string>,
    password: MutableRefObject<string>,
    rememberMe: MutableRefObject<number>,
}