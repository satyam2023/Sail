import {
  ICompetitor,
  IProcuredProduct,
  IRepresentative,
  ISupplier,
} from "models/ApiResponses/CreateCustomer";
import { MutableRefObject } from "react";
import { IFlatlistIndex } from "./IMessage";
import { InputModeOptions } from "react-native";

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

export interface CustomerDetails{
  [key: string]: string;
  code: string;
  company: string;
  cust_seg: string;
  cust_sub_seg: string;
  cust_type: string;
  cust_sub_type: string;
  cust_status: string;
  cust_region: string;
  pan: string;
  gst: string;
  website: string;
  location: string;
  latitude: string;
  longitude: string;
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

export interface RepresentativeDetails{
  [key: string | number]:string;
  name:string;
  designation:string;
  dept:string;
  address:string;
  email:string;
  contact:string;
  whatsApp:string;
}

export interface IEnteredCompetitorDetail {
  [key: string]: MutableRefObject<string>;
  company: MutableRefObject<string>;
  address: MutableRefObject<string>;
  comment: MutableRefObject<string>;
}

export interface CompetitorDetail{
  [key: string]: string;
  company: string;
  address: string;
  comment: string;
}

export interface IsubType {
  customerSegmentIndex: number;
  customerSubTypeIndex: number;
}

export interface IselecteddropDown {
  selectedProcuredProduct: IProcuredProduct[];
  selectedSupplier:ISupplier[];
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

export interface ICustomerTrader {
  placeholder: string;
  length?: number;
  key?: string;
  input?: InputModeOptions;
}


export interface IFlatListExtraItem {
  item: ICustomerTrader ;
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

export interface TraderProcuredSupplier{
  [key:string|number]:MutableRefObject<string|number|number[]|null>
  procured_products: MutableRefObject<number[]>,
supplier: MutableRefObject<number[]>,
}

export interface CustomertypeTrader{
  [key:string|number]:string
cluster: string,
contact_number: string,
day_wise_stock: string,
price_feedback_competitor: string,
procured_products:string,
tentative_quality_procured:string,
supplier:string,
}
export interface ICustomerTypeProject {
  [key:string|number]:MutableRefObject<string|number|number[]>
  procured_products: MutableRefObject<number[]>,
  tentative_quality_procured: MutableRefObject<string>,
  supplier: MutableRefObject<number[]>,
  project_details: MutableRefObject<string>,
};

export interface CustomertypeProject{
  [key:string|number]:string
  procured_products: string,
  tentative_quality_procured: string,
  supplier: string,
  project_details: string,
}

export interface IFlatListCustomerField extends IFlatlistIndex{
    item: ICustomerDetailInputField;
}

export interface IRenderSelectedSupplierAndProcured{
  item: string,
  index: number,
  type: string,
}

export interface ICustomerDetailInputField {
  placeholder: string;
  maxlength?: number;
  key?: string;
}

export interface CompetitorDetailInputField {
  placeholder: string;
  length: number;
  key: string;
}


export interface ICompetitorFlatList extends IFlatlistIndex{
  item:CompetitorDetailInputField
}