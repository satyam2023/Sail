import {
  AllEscalation,
  IMessageDetail,
} from "models/ApiResponses/MessageResponse";
import { MutableRefObject } from "react";
import { IdropDown } from "./ISetting";
export interface IFlatlistIndex {
  index: number;
}

export interface IFlatlistMessageDetail extends IFlatlistIndex {
  item: string;
}

export interface IFlatlistEscalationCard extends IFlatlistIndex {
  item: AllEscalation;
}

export interface IFlatlistMessageBox extends IFlatlistIndex {
  item: IMessageDetail;
}

export interface IEscalatedToAndComment {
  [key: string]: MutableRefObject<string | undefined>;
  escalated_to: MutableRefObject<string | undefined>;
  comment: MutableRefObject<string | undefined>;
}

export interface EscalatedList {
  id:number;
  user_upn:string,
  user_name:string,
}

export interface IFlatListEscalation extends IFlatlistIndex{
item:EscalatedList
}
