import {
  IProcuredProduct,
  IRepresentative,
  ISupplier,
} from "models/ApiResponses/CreateCustomer";
import { IFlatlistIndex } from "./IMessage";
import { IViewCustomerBody } from "models/ApiResponses/ViewCustomerProfile";
import { ICustomertypeTrader, ISelectedImage } from "./ICreateCustomer";
import { MutableRefObject } from "react";
import { IMeetingRepresentativeDetailInputField } from "@shared-constants";

export interface IFlatListCustomerList extends IFlatlistIndex {
  item: IViewCustomerBody;
}

export interface IFlatListRepresentativeList extends IFlatlistIndex {
  item: IRepresentative;
}

export interface IFlatListInputField extends IFlatlistIndex {
  item: string;
}



export interface IFlatListRepresentative extends IFlatlistIndex {
  item: IMeetingRepresentativeDetailInputField
}

export interface IFlatListCompetitor extends IFlatlistIndex {
  item: ICompetitorOfViewProfile;
}

export interface IViewCustomerRepresentative {
  selectedRepresentativeIndex: number;
  addedRepresentativeDetail: IRepresentative[];
  showRepresentativeDetail: boolean;
  editDetails: boolean;
}

export interface IViewCustomerCompetitor {
  selectedCompetitorIndex: number;
  addedCompetitorDetail: ICompetitorOfViewProfile[];
  showcompetitorDetail: boolean;
  editDetails: boolean;
}

export interface ICustomerState {
  editDetails: boolean;
  procuredProduct: IProcuredProduct[];
  supplier: ISupplier[];
  imageSelected: ISelectedImage[];
}

export interface ICompetitorData {
  company_name: string;
  address: string;
  comment: string;
}

export interface ICompetitorOfViewProfile extends ICompetitorData {
  id: number;
  customer_id: number;
}

export interface ICustomerDetail {}

export interface ICustomerDetailError {
  [key: number | number]: boolean | null;
  code: boolean;
  name: boolean;
  segment: boolean | null;
  sub_segment: boolean | null;
  type: boolean;
  sub_type: boolean | null;
  status: boolean | null;
  region: boolean | null;
  pan: boolean | null;
  gst: boolean | null;
  website: boolean | null;
  location: boolean | null;
  cluster: boolean | null;
  contact: boolean | null;
  daywiseStock: boolean | null;
  procuredProduct: boolean | null;
  tentativeQuality: boolean | null;
  supplier: boolean | null;
}

export interface IUpdateTrader_Project_Dealer_Type extends ICustomertypeTrader {
  projectDetail: MutableRefObject<string>;
}

export interface ICompetitorError {
  [key: string | number]: boolean | null;
  name: boolean | null;
  address: boolean | null;
  comment: boolean | null;
}
