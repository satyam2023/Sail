import { MutableRefObject } from "react"

export interface  IvisitPlanDetail {
    [key: string | number]: MutableRefObject<string | number|undefined>;
    customerCode: MutableRefObject<string|undefined>;
    name: MutableRefObject<string|undefined>;
    nickName: MutableRefObject<string>;
    customerRegion: MutableRefObject<string|undefined>;
    visitingExecutive: MutableRefObject<string>;
    visitDate: MutableRefObject<string>;
    reason: MutableRefObject<string>;
    modeOfContact: MutableRefObject<string>;
    remarks: MutableRefObject<string>;
 };

 export interface ICreateVisitDrop{
 }