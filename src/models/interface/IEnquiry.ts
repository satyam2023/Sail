import { IIssueEnquiry } from "models/ApiResponses/IEnquiryResponses";
import { MutableRefObject } from "react";
import { IFlatlistIndex } from "./IMessage";

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

export interface IFlatlistRenderIssueEnquiry extends IFlatlistIndex{
    item:IIssueEnquiry;
}