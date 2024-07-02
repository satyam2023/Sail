import {
  AllEscalation,
  IMessageDetail,
} from "models/ApiResponses/MessageResponse";
import { MutableRefObject } from "react";
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
