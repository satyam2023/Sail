import { MutableRefObject } from "react";

export interface ISignInUser{
    [key:string|number]:MutableRefObject<string|number>;
    upn: MutableRefObject<string>,
    password: MutableRefObject<string>,
    rememberMe: MutableRefObject<number>,
}

export interface IBiometricStatus{
    [key:string|number]:boolean;
    faceId:boolean,
    fingerId:boolean,
}