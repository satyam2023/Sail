import {
  AllEscalation,
  IMessageDetail,
} from "models/ApiResponses/MessageResponse";
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
