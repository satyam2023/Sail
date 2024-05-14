import { MutableRefObject } from "react";
import { IFlatlistIndex } from "./IMessage";
import { ITextField } from "@shared-constants";



export interface IUpdatedetails{
    [key:string|number]:MutableRefObject<string|number>;
    email:MutableRefObject<string>;
    Location:MutableRefObject<string>;
    Role:MutableRefObject<number>;
}

export interface IdropDown{
    name:string;
     id:number;
     created_at?: any,
     updated_at?:any,
     user_upn?:string,
     user_name?:string,
}

export interface IFlalistSetting extends IFlatlistIndex{
    item:ITextField
}