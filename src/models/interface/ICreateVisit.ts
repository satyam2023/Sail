
import { MutableRefObject } from "react"
import { IFlatlistIndex } from "./IMessage";
import { InputModeOptions } from "react-native";

export interface  IvisitPlanDetail {
    [key: string | number]: MutableRefObject<string | number>;
    customerCode: MutableRefObject<string>;
    name: MutableRefObject<string>;
    nickName: MutableRefObject<string>;
    customerRegion: MutableRefObject<string>;
    visitingExecutive: MutableRefObject<string>;
    visitDate: MutableRefObject<string>;
    reason: MutableRefObject<string>;
    modeOfContact: MutableRefObject<string>;
    remarks: MutableRefObject<string>;
 };

 export interface ICreateVisitDrop{
 }

 export interface ICreateVisitError{
    [key:string|number]:boolean|null;
    code:boolean|null,
    name:boolean|null,
    nick:boolean|null,
    region:boolean|null,
    executive:boolean|null,
    date:boolean|null,
    reason:boolean|null,
    mode:boolean|null,
    remarks:boolean|null,
 }

 export interface ICreateVisitFieldFlatlist extends IFlatlistIndex{
   item:ICreateVisitPlaneField
 }

 export interface ICreateVisitPlaneField {
   placeholder: string;
   maxlength?: number;
   inputMode?: InputModeOptions;
   key?: string;
 }