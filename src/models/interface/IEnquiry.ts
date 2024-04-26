import { MutableRefObject } from "react";

export interface IuserEnquiryEnteredData{
    name:MutableRefObject<string>,
    location:MutableRefObject<string>,
}

export interface IissueEnquiryEnteredData{
    customerCodeName:MutableRefObject<string>,
    location:MutableRefObject<string>,
}