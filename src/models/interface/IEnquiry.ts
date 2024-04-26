import { MutableRefObject } from "react";

export interface IuserEnquiryEnteredData{
    [key:string|number]:MutableRefObject<string>
    name:MutableRefObject<string>,
    location:MutableRefObject<string>,
}

export interface IissueEnquiryEnteredData{
    [key:string|number]:MutableRefObject<string>,
    customerCodeName:MutableRefObject<string>,
    location:MutableRefObject<string>,
}