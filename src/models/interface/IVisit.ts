import { MutableRefObject } from "react";
import { IFlatlistIndex } from "./IMessage";
import { ExecutedResponse } from "models/ApiResponses/VisitResponse";

export interface IPlannedVisitEdit {
  visitDate: MutableRefObject<string>;
  modeOfContact: MutableRefObject<string>;
  id: MutableRefObject<number>;
}

export interface IList {
  heading: string;
  lowertext?: string;
  imagepath?: string;
}

export interface IFlatlistExecuted extends IFlatlistIndex {
  item: ExecutedResponse;
}

export interface IVisitDetail {
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
}

export interface IVisitScreenPagination{
  upcoming:MutableRefObject<number>,
  planned:MutableRefObject<number>,
  executed:MutableRefObject<number>,
}

export interface IFilterDataDetails{
  [key:string|number]:MutableRefObject<string|undefined>,
  dayFrom: MutableRefObject<string|undefined>,
  dayTo: MutableRefObject<string|undefined>,
  durationRange: MutableRefObject<string|undefined>,
  filterType: MutableRefObject<string|undefined>,
}