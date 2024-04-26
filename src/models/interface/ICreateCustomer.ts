import {
  ICompetitor,
  IRepresentative,
} from "models/ApiResponses/CreateCustomer";
import { MutableRefObject } from "react";

export interface IExample {
  [key: string | number]: MutableRefObject<string | number|undefined>;
}

export interface IEnteredCustomerDetails {
  [key: string | number]: MutableRefObject<string | number|undefined>;
  code: MutableRefObject<string>;
  company: MutableRefObject<string>;
  cust_seg: MutableRefObject<number|undefined>;
  cust_sub_seg: MutableRefObject<number|undefined>;
  cust_type: MutableRefObject<number|undefined>;
  cust_sub_type: MutableRefObject<number|undefined>;
  cust_status: MutableRefObject<number|undefined>;
  cust_region: MutableRefObject<string>;
  pan: MutableRefObject<string>;
  gst: MutableRefObject<string>;
  website: MutableRefObject<string>;
  location: MutableRefObject<string>;
  latitude: MutableRefObject<string>;
  longitude: MutableRefObject<string>;
}

export interface IrepresentativeData {
  file_name: string;
  name: string;
  designation: string;
  department: string;
  address: string;
  email: string;
  contact_number: string;
  whatsapp_number: string;
}

export interface IRepresentativeEnteredDetail {
  [key: string | number]: MutableRefObject<string | number>;
  name: MutableRefObject<string>;
  designation: MutableRefObject<string>;
  dept: MutableRefObject<string>;
  address: MutableRefObject<string>;
  email: MutableRefObject<string>;
  contact: MutableRefObject<string>;
  whatsApp: MutableRefObject<string>;
}

export interface IEnteredCompetitorDetail {
  [key: string]: MutableRefObject<string>;
  company: MutableRefObject<string>;
  address: MutableRefObject<string>;
  comment: MutableRefObject<string>;
}

export interface IsubType {
  customerSegmentIndex: number;
  customerSubTypeIndex: number;
}

export interface IselecteddropDown {
  selectedProcuredProduct: string[];
  selectedSupplier: string[];
}

export interface ISelectedImage {
  fileName: string;
  fileSize: number;
  height: number;
  type: string;
  uri: string;
  width: number;
}

export interface IadditionalList {
  representativeList: IRepresentative[];
  competitorList: ICompetitor[];
}

export interface IFlatListExtraItem {
  item: string;
  index: number;
}

export interface IFlatlistCompetitorList{
  item:ICompetitor,
  index:number,
}

export interface ICustomertypeTrader{
  [key:string|number]:MutableRefObject<string|number|number[]|null>
cluster: MutableRefObject<number|null>,
contact_number: MutableRefObject<string>,
day_wise_stock: MutableRefObject<string>,
price_feedback_competitor: MutableRefObject<string>,
procured_products: MutableRefObject<number[]>,
tentative_quality_procured: MutableRefObject<string>,
supplier: MutableRefObject<number[]>,
}

export interface ICustomerTypeProject {
  [key:string|number]:MutableRefObject<string|number|number[]>
  procured_products: MutableRefObject<number[]>,
  tentative_quality_procured: MutableRefObject<string>,
  supplier: MutableRefObject<number[]>,
  project_details: MutableRefObject<string>,
};